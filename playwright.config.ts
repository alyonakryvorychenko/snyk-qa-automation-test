import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: 'tests',
  timeout: 10_000,
  //timeout set up for asserions
  expect: {
    timeout: 5000
  },
  reporter: 'html',
  workers: 1,
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:8080/',
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } }
  ]
});