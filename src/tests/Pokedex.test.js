import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
// import Pokedex from '../pages/Pokedex';

describe('Teste do component Pokedex', () => {
  test('A página contem um h2 com o texto Encounted Pokémons', () => {
    renderWithRouter(<App />);
    const foundTitle = screen.getByRole('heading', {
      name: /encountered pokémons/i,
      level: 2,
    });
    expect(foundTitle).toBeInTheDocument();
  });

  test('É exibido o próximo pokemons quando clicado no botão', () => {
    renderWithRouter(<App />);
    const nextBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    const pikachuInfo = screen.getByText(/pikachu/i);
    expect(pikachuInfo).toBeInTheDocument();
    userEvent.click(nextBtn);
    const charmanderInfo = screen.getByText(/charmander/i);
    expect(charmanderInfo).toBeInTheDocument();
  });

  test('É mostrado apenas um pokemon por vez', () => {
    const { container } = renderWithRouter(<App />);
    const onePokemonForScreen = container.querySelectorAll('.pokemon').length;
    expect(onePokemonForScreen).toEqual(1);
  });

  test('filtros da pokedex', () => {
    renderWithRouter(<App />);
    const numberOfTypes = 7;
    const typeButton = screen.getAllByTestId('pokemon-type-button');
    expect(typeButton.length).toEqual(numberOfTypes);
    const fireButton = screen.getByRole('button', { name: /fire/i });
    userEvent.click(fireButton);
    const onlyTypeFire = screen.getAllByText(/fire/i);
    expect(onlyTypeFire[0].textContent).toBe('Fire');
    userEvent.click(fireButton);
    expect(onlyTypeFire[0].textContent).toBe('Fire');
    const allButton = screen.getByRole('button', { name: /all/i });
    expect(allButton).toBeInTheDocument();
  });

  test('Contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', { name: /all/i });
    expect(allButton).toBeInTheDocument();
  });
});
