import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../pages/FavoritePokemons';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Teste do component FavoritePokemons', () => {
  test('caso não tenha pokemons exibe a mensagem no favorite pokemons', () => {
    renderWithRouter(<FavoritePokemons />);
    const empatyMessage = screen.getByText(/no favorite pokemon found/i);
    expect(empatyMessage).toBeInTheDocument();
  });

  test('É exibido pokemons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const btnFire = screen.getByRole('button', { name: /fire/i });
    userEvent.click(btnFire);
    const btnDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(btnDetails);
    const favCheck = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(favCheck);
    act(() => {
      history.push('/favorites');
    });
    const favPokemon = screen.getByText(/charmander/i);
    expect(favPokemon).toBeInTheDocument();
  });
});
