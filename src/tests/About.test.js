// import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import About from '../pages/About';

describe('Teste do component about', () => {
  test('A página contem informações sobre a pokedex', () => {
    renderWithRouter(<About />);
    const text = screen.getByText(/simulates a Pokédex/i);
    expect(text).toBeInTheDocument();
  });

  test('se contém um h2 com o texto about pokédex', () => {
    renderWithRouter(<About />);
    const aboutText = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(aboutText).toBeInTheDocument();
  });

  test('A página contem dois paragrafos', () => {
    const { container } = renderWithRouter(<About />);
    const paragraphs = container.getElementsByTagName('p');
    expect(paragraphs.length).toEqual(2);
  });

  test('Contém a imagem de uma pokedex', () => {
    renderWithRouter(<About />);
    const imageURL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = screen.getByAltText(/pokédex/i);
    expect(image.src).toBe(imageURL);
  });
});
