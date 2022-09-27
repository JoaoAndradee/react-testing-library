import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import NotFound from '../pages/NotFound';

describe('Teste do component NotFound', () => {
  test('A página contém um h2 com o texto page requested not found', () => {
    renderWithRouter(<NotFound />);
    const notFoundTitle = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });
    expect(notFoundTitle).toBeInTheDocument();
  });

  test('A página mostra a imagem com link certo', () => {
    const { container } = renderWithRouter(<NotFound />);
    const correctLinkImg = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imgNotFound = container.getElementsByTagName('img')[0];
    expect(imgNotFound.src).toBe(correctLinkImg);
  });
});
