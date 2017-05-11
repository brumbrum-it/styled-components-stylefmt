# Modern CSS Formatter for the component age

[![npm](https://img.shields.io/npm/v/styled-components-stylefmt.svg)](https://www.npmjs.com/package/styled-components-stylefmt)
[![Build Status](https://travis-ci.org/brumbrum-it/styled-components-stylefmt.svg?branch=master)](https://travis-ci.org/brumbrum-it/styled-components-stylefmt)
[![Coverage Status](https://coveralls.io/repos/github/brumbrum-it/styled-components-stylefmt/badge.svg?branch=master)](https://coveralls.io/github/brumbrum-it/styled-components-stylefmt?branch=master)

<div style="display: flex; width: 100%; align-items: center; justify-content: center; margin: 20px 0;">
  <a href="https://github.com/morishitter/stylefmt">
    <img width="150px" src="http://morishitter.github.io/stylefmt-logo.svg">
  </a>
  
  <span style="margin: 0 30px; font-size: 30px;">+</span>
  
  <a href="https://github.com/styled-components/styled-components">
    <img alt="styled-components" src="https://raw.githubusercontent.com/styled-components/brand/master/styled-components.png" width="150px" />
  </a>
</div>

## Installation

with **yarn**:

```bash
yarn add --dev styled-components-stylefmt
```

or with **npm**:

```bash
npm install --save-dev styled-components-stylefmt
```

## Features

- works just as [stylefmt](https://www.npmjs.com/package/stylefmt), addind support for formatting [styled-components](https://www.npmjs.com/package/styled-components)!

## Example

```js
import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 1.5em;
 text-align: center;
    color: palevioletred;
`;

const Wrapper = styled.section`
  padding   : 4em;
  background: papayawhip   ;
`;
```

yields:

```js
import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;
```

## Usage

### in command line

CLI help:

```bash
styled-components-stylefmt --help
```

```bash
Usage: styled-components-stylefmt [options] input-name [output-name]

Options:

  -b, --config-basedir   Path to the directory that relative paths defining \\"extends\\"
  -c, --config           Path to a specific configuration file (JSON, YAML, or CommonJS)
  -d, --diff             Output diff against original file
  -r, --recursive        Format list of space seperated files(globs) in place
  -v, --version          Output the version number
  -h, --help             Output usage information
  -i, --ignore-path      Path to a file containing patterns that describe files to ignore.
```

### in Node.js

```js
const formatter = require('styled-components-stylefmt')

const stylefmtOptions = {
  // ...
}

const formatted = formatter('input.js', stylefmtOptions)
```

## stylelint rules it can handle

All the rules that [stylefmt can](https://github.com/morishitter/stylefmt/blob/master/README.md#stylelint-rules-that-stylefmt-can-handle).
