# LaTex Action

This Docker container action aims at preparing a LaTeX document. It uses the [`latex`](https://github.com/AutonomyOrg/docker-images/tree/main/latex) Docker image to build the 
Docker container in which the LaTeX engine is executed to build the final document.

## Inputs

The following input parameters

| Parameter | Description | Default |
| --------- | ----------- | ------- |
| `main_file`      | Main file path name | None |
| `working_directory` | Action's working directory | None |
| `compiler`   | LaTeX engine to be used | [`latexmk`](https://ctan.org/pkg/latexmk?lang=en) |
| `compiler_options`   | List of options to be passed to the LaTex engine | `-pdf -file-line-error -halt-on-error -interaction=nonstopmode` |

## Outputs

None

## Usage

The sample workflow below shows how to use this action.

```yaml
name: Build LaTeX document

on:
  push:
    branches:
      - main

jobs:

  # Prepare LaTeX document
  build-document:
    runs-on: ubuntu-latest

    steps:
      # Compile source LaTeX document and output a PDF version
      - name: Compile LaTeX document
        uses: github/AutonomyOrg/github-actions/latex-action
        with:
          main_file: main.tex
          compiler_options: -lualatex -latexoption=-file-line-error -latexoption=-interaction=nonstopmode -latexoption=-shell-escape
```

## Credits

- https://github.com/xu-cheng/latex-action
- https://github.com/dante-ev/latex-action
