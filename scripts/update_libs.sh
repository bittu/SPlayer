#!/bin/bash
if [ ! -d public/lib ]
then
  mkdir public/lib
fi

if [ ! -d public/lib/theoPlayer ]
then
  mkdir public/lib/theoPlayer
fi

cp lib/theoPlayer/theoplayer.*.js public/lib/theoPlayer/