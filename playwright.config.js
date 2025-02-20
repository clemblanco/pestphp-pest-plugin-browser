// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

const port = process.env.PORT || 9357;
const host = process.env.HOST || 'localhost';
const baseURL = process.env.BASE_URL || `http://${host}:${port}`;

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
    testDir: './.temp/e2e',
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 1,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: 'html',
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL,

        /* Capture screenshot after each test failure. */
        screenshot: {
            mode: 'only-on-failure',
            fullPage: true,
        },

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry',

        /* Record video only when retrying a test for the first time. */
        video: 'on-first-retry',

        /* Default resolution */
        viewport: { width: 1280, height: 720 },
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],

    /* Run your local dev server before starting the tests */
    webServer: {
        cwd: `${__dirname}/playground`,
        command: `php artisan serve --port=${port}`,
        url: baseURL,
        reuseExistingServer: !process.env.CI,
    },
});
