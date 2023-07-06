#!/bin/zsh
# Ce script permet de publier une nouvelle version de démo de manip@syntaxe

if [[ ${PWD##*/} != "demo" ]]; then
    print Il faut lancer le script depuis le dossier de démo.
    exit 1
fi

if [[ ${#@} -ne 2 ]]; then
    print Deux arguments sont requis : la version, puis le commentaire
    exit 1
fi
# TODO vérifier que les arguments sont valables

version=$1
commentaire=$2

# build
cd ..
npm run build

# déplacement du dossier de build
mv dist demo/$version

# création d'une nouvelle version dans versions.csv
cd demo
print "\"$version\",\"$(date +"%d/%m/%Y")\",\"$commentaire\"" >> versions.csv

# remplissage du tableau et génération du nouvel index.html

# enregistrement dans git 
git add $version/*
git commit -am $commentaire
git tag -a $version -m $commentaire

# push
git push -u origin master
