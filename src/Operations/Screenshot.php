<?php

declare(strict_types=1);

namespace Pest\Browser\Operations;

use Pest\Browser\Contracts\Operation;
use Pest\TestSuite;

use function mb_ltrim;

/**
 * @internal
 */
final readonly class Screenshot implements Operation
{
    /**
     * The path to save the screenshot.
     */
    private string $path;

    /**
     * Creates an operation instance.
     */
    public function __construct(
        ?string $path = null,
    ) {
        $basePath = TestSuite::getInstance()->testPath.'/Browser/screenshots';

        $path ??= $this->generateFilename();

        $this->path = $basePath.'/'.$path;
    }

    public function compile(): string
    {
        return sprintf("await page.screenshot({ path: '%s' });", $this->path);
    }

    private function generateFilename(): string
    {
        $name = test()->name(); // @phpstan-ignore-line
        assert(is_string($name));

        return mb_ltrim($name, '__pest_evaluable_')
            .'_'
            .date('Y_m_d_H_i_s').'.png';
    }
}
