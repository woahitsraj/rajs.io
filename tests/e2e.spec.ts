import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { level: 1, name: 'Rajan Singh' })).toBeVisible();
});

test('revealed content becomes visible with javascript enabled', async ({ page }) => {
	await page.goto('/');
	await page.waitForSelector('.reveal-scope.visible');
	const firstReveal = page.locator('.reveal').first();

	await expect
		.poll(async () => {
			return await firstReveal.evaluate((element) => {
				return getComputedStyle(element).opacity;
			});
		})
		.toBe('1');

	const transform = await firstReveal.evaluate((element) => {
		return getComputedStyle(element).transform;
	});

	expect(['none', 'matrix(1, 0, 0, 1, 0, 0)']).toContain(transform);
});

test.describe('without javascript', () => {
	test.use({ javaScriptEnabled: false });

	test('revealed content renders normally', async ({ page }) => {
		await page.goto('/');

		const styles = await page
			.locator('.reveal')
			.first()
			.evaluate((element) => {
				const computed = getComputedStyle(element);

				return {
					opacity: computed.opacity,
					transform: computed.transform
				};
			});

		expect(styles.opacity).toBe('1');
		expect(['none', 'matrix(1, 0, 0, 1, 0, 0)']).toContain(styles.transform);
	});

	test('hides the theme toggle', async ({ page }) => {
		await page.goto('/');
		await expect(page.getByRole('button', { name: 'toggle theme' })).not.toBeVisible();
	});

	test.describe('with a dark system preference', () => {
		test.use({ colorScheme: 'dark' });

		test('uses the dark theme fallback', async ({ page }) => {
			await page.goto('/');

			const rootTheme = await page.locator('html').evaluate((element) => {
				const computed = getComputedStyle(element);

				return {
					siteBg: computed.getPropertyValue('--site-bg').trim(),
					colorScheme: computed.colorScheme
				};
			});

			expect(rootTheme.siteBg).toBe('#15110d');
			expect(rootTheme.colorScheme).toBe('dark');
		});
	});
});
