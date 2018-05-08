#!/usr/bin/env bash

# if the tag matches the regex, return true (0)
# else return false (1)
is_version(){
  if [[ "$1" =~ [0-9]+\.[0-9]+\.[0-9] ]]; then
    return 0
  else 
    return 1
  fi
}

# if the version is in the git tags return false (1)
# else return true (0)
is_new_version(){
  if [[ $(git tag -l | grep "v$1") ]]; then
    return 1
  else
    return 0
  fi
}

is_old_version(){
  if [[ $(git tag -l | grep "v$1") ]]; then
    return 0
  else
    return 1
  fi
}


# make sure both $1 and $2 are versions
# and version$1 exists and version$2 does not
if is_version $1 && is_version $2; then

  # revert the changes and exit early 
  if [[ $3 == "revert" ]]; then
    git stash
    git tag -d v$2
    exit 0
  fi

  if is_old_version $1; then
    if is_new_version $2; then
      echo "moving from version $1 to $2"
      # use zip -FS to overwrite chrome-compare.v$2.zip if it exists
      commands=(
        "sed -i 's/$1/$2/g' $PWD/extension/manifest.json" 
        "sed -i 's/$1/$2/g' $PWD/package.json" 
        "npm install"
        "zip -FSr $PWD/chrome-compare.v$2.zip $PWD/extension/"
        "echo 'don't forget to git tag v$2 after commit'"
      )
      # can't use for in when elements contain spaces
      # must iterate over indexes
      # https://stackoverflow.com/questions/9084257/bash-array-with-spaces-in-elements
      for ((i = 0; i < ${#commands[@]}; i++))
        do
        if [[ $3 == "prod" ]]; then
          eval "${commands[$i]}"
        else
          echo "${commands[$i]}"
        fi
      done

    else
      echo "$2 is not a new version"
    fi
  else
    echo "$1 is not an existing version"
  fi
else
  echo "either $1 or $2 does not match the version format \d.\d.\d"
fi
