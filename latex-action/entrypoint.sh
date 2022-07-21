#!/bin/sh

set -e

# -------------------------------------------------------------------------------------------------
# FUNCTIONS
# -------------------------------------------------------------------------------------------------

info() {
  echo -e "\033[1;34m$1\033[0m"
}

warn() {
  echo "::warning :: $1"
}

error() {
  echo "::error :: $1"
  exit 1
}

# -------------------------------------------------------------------------------------------------
# ENTRY POINT
# -------------------------------------------------------------------------------------------------

main_file="$1"
working_directory="$2"
compiler="$3"
compiler_options="$4"

if [ -z "$main_file" ]; then
  error "Input 'main_file' is missing."
fi

if [[ -z "$compiler" && -z "$compiler_options" ]]; then
  warn "Input 'compiler' and 'compiler_options' are both empty. Reset them to default values."
  compiler="latexmk"
  compiler_options="-pdf -file-line-error -halt-on-error -interaction=nonstopmode -shell-escape"
fi

if [ -n "$working_directory" ]; then
  cd "$working_directory"
fi

# Set Github workspace directory as a secure git repository
#
# See: https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners#docker-container-filesystem
git config --global --add safe.directory "/github/workspace"

"$compiler" $compiler_options "$main_file"