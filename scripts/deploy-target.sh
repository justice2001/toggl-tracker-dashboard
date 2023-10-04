#!/bin/bash

echo $1
cd $1
mv dist.tar.gz ..
rm -rf *
mv ../dist.tar.gz .
tar -xzvf dist.tar.gz
mv dist/* .
rm -rf dist
rm -f dist.tar.gz
chown -R www:www *

