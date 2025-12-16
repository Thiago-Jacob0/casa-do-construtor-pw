import { Page, Locator, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

export class HomePage {
  readonly page: Page;
  readonly searchStoreInput: Locator;
  readonly searchProductInput: Locator;
  readonly searchButton: Locator;
  readonly productResultsBlock: Locator;
  readonly productResultsBlock2: Locator;
  readonly noResultsMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchStoreInput = page.getByRole('textbox', { name: 'Pesquise a loja pela cidade' });
    this.searchProductInput = page.getByRole('textbox', { name: 'Do que você precisa?' });
    this.searchButton = page.getByRole('button', { name: 'search' });
    this.productResultsBlock = page.locator('#block-cdc-theme-views-block-produtos-taxonomia-pagina-block-1');
    this.productResultsBlock2 = page.locator('#block-cdc-theme-views-block-produtos-taxonomia-pagina-block-2');
    this.noResultsMessage = page.locator('li.item-no-result', { hasText: 'Nenhum resultado foi encontrado na busca' });
  }

  async goto() {
    await this.page.goto('https://casadoconstrutor.com.br/pt-br');
  }

  async searchStore(city: string) {
    await this.searchStoreInput.click();
    await this.searchStoreInput.fill(city);
  }

  async selectStore(storeName: string) {
    await this.page.getByRole('link', { name: storeName }).click();
  }

  async clickSearchButton() {
    // Aguarda o botão estar pronto antes de clicar
    await this.searchButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.searchButton.click();
  }

  async searchProduct(productName: string) {
    await this.searchProductInput.fill(productName);
  }

  async selectProductFromAutocomplete() {
    await this.page.locator('#ui-id-3').click();
  }

  async verifyProductResults(expectedText: string) {
    await expect(this.productResultsBlock).toContainText(expectedText);
  }

  async verifyProductResultsBlock2(expectedText: string) {
    // Aguarda o bloco aparecer antes de verificar
    await this.productResultsBlock2.waitFor({ state: 'attached', timeout: 10000 });
    await expect(this.productResultsBlock2).toContainText(expectedText);
  }

  async clearSearchInput() {
    // Aguarda o campo estar pronto antes de interagir
    await this.searchProductInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.searchProductInput.click();
    // Limpa o campo usando Ctrl+A e Delete para garantir que está vazio
    await this.searchProductInput.fill('');
  }

  async searchProductAndPressEnter(productName: string) {
    await this.searchProductInput.fill(productName);
    await this.searchProductInput.press('Enter');
  }

  async verifyNoResultsMessage() {
    // Verifica se a mensagem de "nenhum resultado" está presente na página
    // O elemento pode estar no DOM mas oculto por CSS, então verificamos o texto
    const messageLocator = this.page.locator('li.item-no-result', { hasText: 'Nenhum resultado foi encontrado na busca' }).first();
    // Aguarda o elemento estar no DOM (não necessariamente visível)
    await messageLocator.waitFor({ state: 'attached', timeout: 10000 });
    // Verifica se o texto está presente (mesmo que o elemento esteja oculto)
    await expect(messageLocator).toContainText('Nenhum resultado foi encontrado na busca');
  }

  async captureEvidence(fileName: string) {
    const evidenceDir = path.join(process.cwd(), 'evidencias');
    if (!fs.existsSync(evidenceDir)) {
      fs.mkdirSync(evidenceDir, { recursive: true });
    }
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const screenshotPath = path.join(evidenceDir, `${fileName}-${timestamp}.png`);
    // Aguarda a página estar estável antes de capturar screenshot
    await this.page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
    await this.page.screenshot({ path: screenshotPath, fullPage: true, timeout: 15000 });
    return screenshotPath;
  }
}

