import { describe, it, expect, vi } from 'vitest';
import { runGenerator } from './index.js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Integration - Index Generator', () => {
  it('should read JSON and write HTML file', () => {
    const testJsonPath = path.join(__dirname, '../data/page.json');
    const testOutputPath = path.join(__dirname, '../test-output.html');
    
    const html = runGenerator(testJsonPath, testOutputPath);
    
    expect(html).toContain('<!DOCTYPE html>');
    expect(fs.existsSync(testOutputPath)).toBe(true);
    
    const savedHtml = fs.readFileSync(testOutputPath, 'utf-8');
    expect(savedHtml).toBe(html);
    
    // Cleanup
    fs.unlinkSync(testOutputPath);
  });
});
