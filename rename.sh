#!/bin/bash 
read_dir(){ 
  for file in `ls -a $1` 
  do 
    if [ -d $1"/"$file ] 
      then 
        if [[ $file != '.' && $file != '..' ]] 
          then 
            read_dir $1"/"$file 
          fi 
        else 
          name=`echo $file | sed 's/\.js$/\.ts/g'`
          mv $1"/"$file $1"/"$name
        fi 
  done 
}
read_dir src