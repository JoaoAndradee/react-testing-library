import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testes do component app', () => {
  test('se o primeiro link possui o texto Home', () => {
    renderWithRouter(<App />);
    const homeButton = screen.getByRole('link', { name: /home/i });
    expect(homeButton).toBeInTheDocument();
  });

  test('O segundo link deve possuir o texto About', () => {
    renderWithRouter(<App />);
    const aboutButton = screen.getByRole('link', { name: /about/i });
    expect(aboutButton).toBeInTheDocument();
  });

  test('O terceiro link deve possuir o texto Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const favoritePokemonsBtn = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(favoritePokemonsBtn).toBeInTheDocument();
  });

  test('ao clicar em home, é redirecionado para "/".', () => {
    const { history } = renderWithRouter(<App />);
    const homeButton = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('ao clicar em about, é redirecionado para "/about".', () => {
    const { history } = renderWithRouter(<App />);
    const aboutButton = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('ao clicar em favorite pokemons, é redirecionado para "/favorites".', () => {
    const { history } = renderWithRouter(<App />);
    const favoritePokemonsBtn = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoritePokemonsBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('se ao digitar url incompativel a pagina notFound é exibida', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/lalala');
    });
    const titleNotFound = screen.getByRole('heading', {
      name: /page requested not found/i,
    });

    expect(titleNotFound).toBeInTheDocument();
  });
});
