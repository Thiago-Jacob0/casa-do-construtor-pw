import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import * as fs from 'fs';
import * as path from 'path';

test('deve testar busca e limpeza de campo de pesquisa', async ({ page }) => {
  const homePage = new HomePage(page);
  
  // Navega para a página inicial
  await homePage.goto();
  
  // Seleciona loja do Rio de Janeiro
  await homePage.searchStore('rio de janei');
  await homePage.selectStore('Rio de Janeiro - RJ (Taquara)');
  await homePage.clickSearchButton();
  
  // Busca por produto "Limpeza"
  await homePage.searchProduct('Limpeza');
  await homePage.selectProductFromAutocomplete();
  await homePage.verifyProductResultsBlock2('Limpeza');
  
  // Testa limpeza do campo de busca com produto inexistente
  await homePage.clickSearchButton();
  await homePage.clearSearchInput();
  await homePage.searchProduct('produtoteste12345');
  await homePage.clickSearchButton();
  await homePage.verifyNoResultsMessage();
  
  // Testa novamente a busca com produto inexistente
  await homePage.searchProduct('produtoteste12345');
  await homePage.clickSearchButton();
  await homePage.verifyNoResultsMessage();
  
  // Testa busca pressionando Enter
  await homePage.searchProductAndPressEnter('produtoteste12345');
  await homePage.verifyNoResultsMessage();
  
  // Captura evidência
  const evidencePath = await homePage.captureEvidence('busca-limpeza-sucesso');
  
  // Registra log de sucesso
  const logMessage = `✅ TESTE EXECUTADO COM SUCESSO!\n` +
    `Data/Hora: ${new Date().toLocaleString('pt-BR')}\n` +
    `Teste: Busca e limpeza de campo de pesquisa\n` +
    `Evidência capturada: ${evidencePath}\n` +
    `Status: PASSED\n`;
  
  console.log(logMessage);
  
  // Salva log em arquivo
  const logDir = path.join(process.cwd(), 'logs');
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
  const logPath = path.join(logDir, `test-log-${Date.now()}.txt`);
  fs.writeFileSync(logPath, logMessage);
  
  console.log(`📝 Log salvo em: ${logPath}`);
});