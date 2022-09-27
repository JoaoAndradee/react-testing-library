import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

const link = '/pokemons/25';

describe('Teste do component Pokemon', () => {
  test('É renderizado um card com as informações do pokemon', () => {
    renderWithRouter(<App />);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });

  test('O tipo correto do pokemon deve ser mostrado', () => {
    renderWithRouter(<App />);
    const eletricType = screen.getAllByText(/electric/i);
    expect(eletricType[0].textContent).toBe('Electric');
  });

  test('O peso medio do pokemon deve ser exibido', () => {
    renderWithRouter(<App />);
    const pikachuWeight = screen.getByText(/average weight: 6\.0 kg/i);
    expect(pikachuWeight).toBeInTheDocument();
  });

  test('A imagem correta do pokemon deve ser exibida', () => {
    renderWithRouter(<App />);
    const pikachuImg = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pikachuImg).toBeInTheDocument();
  });

  test('O link exibir detalhes direciona para a url correta', () => {
    const { history } = renderWithRouter(<App />);
    const showDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(showDetails);
    const { location: { pathname } } = history;
    expect(pathname).toBe(link);
  });

  test('Ao clicar no link de nav. do pokemon é redirecionado para seus detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const btnDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(btnDetails);
    const { location: { pathname } } = history;
    expect(pathname).toBe(link);
  });

  test('Exibe a imagem de favoritados quando escolhido esta opção', () => {
    const { history, container } = renderWithRouter(<App />);

    act(() => {
      history.push(link);
    });

    const checkFav = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(checkFav);
    const homeBtn = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeBtn);
    const favImg1 = screen.getByAltText(/pikachu is marked as favorite/i);
    const favImg = container.getElementsByTagName('img');
    expect(favImg[1].src).toBe('http://localhost/star-icon.svg');
    expect(favImg1).toBeInTheDocument();
    const typeCheck = screen.getAllByText(/electric/i);
    expect(typeCheck[0].textContent).toBe('Electric');
    userEvent.click(typeCheck[1]);
    const pikachuImg1 = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pikachuImg1.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
});
