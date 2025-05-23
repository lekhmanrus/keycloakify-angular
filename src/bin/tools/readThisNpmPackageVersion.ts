import { getThisCodebaseRootDirPath } from './getThisCodebaseRootDirPath';
import { assert } from 'tsafe/assert';
import * as fs from 'fs';
import { join as pathJoin } from 'path';

let cache: string | undefined = undefined;

export function readThisNpmPackageVersion(): string {
    if (cache !== undefined) {
        return cache;
    }

    const version = JSON.parse(
        fs
            .readFileSync(pathJoin(getThisCodebaseRootDirPath(), 'package.json'))
            .toString('utf8')
    )['version'];

    assert(typeof version === 'string');

    cache = version;

    return version;
}
