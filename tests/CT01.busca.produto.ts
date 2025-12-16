import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import * as fs from 'fs';
import * as path from 'path';

test('deve buscar produto betoneira na loja de Rio Claro', async ({ page }) => {
  const homePage = new HomePage(page);
  
  await homePage.goto();
  await homePage.searchStore('rio claro');
  await homePage.selectStore('Rio Claro - SP (Rua 09)');
  await homePage.clickSearchButton();
  await homePage.searchProduct('betoneira');
  await homePage.selectProductFromAutocomplete();
  await homePage.verifyProductResults('Betoneira');
  
  // Captura evidência
  const evidencePath = await homePage.captureEvidence('busca-betoneira-sucesso');
  
  // Registra log de sucesso
  const logMessage = `✅ TESTE EXECUTADO COM SUCESSO!\n` +
    `Data/Hora: ${new Date().toLocaleString('pt-BR')}\n` +
    `Teste: Busca de produto betoneira na loja de Rio Claro\n` +
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