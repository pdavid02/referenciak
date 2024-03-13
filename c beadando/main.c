#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include "beadando.h"

int main(int argc, char **argv)
{
    if(argc < 3)
    {
        usage();
    }
    else{

    struct argu argumentumok;
    
    argumentumok.sorszam = argv[1];
    argumentumok.maxhossz = atoi(argv[2]);

    
       int size = argc-3;
        char **fajlok = malloc(size*(sizeof(char*)));

        for(int i = 0; i < size; i++)
        {
            fajlok[i] = malloc(255);
        }
        
    int k = 3;

    for(int i = 0; i < argc-3; i++)
    {
        strcpy(fajlok[i], argv[k]);
        //printf("%s\n", fajlok[i]);
        k++;
    }
    

    if((strcmp(argumentumok.sorszam,"linenums") == 0) || (strcmp(argumentumok.sorszam,"nolinenums") == 0))
    {
        
        readnwrite(fajlok, argumentumok.maxhossz, size,argumentumok.sorszam);
    }
    else 
    {
       printf("Nem megfelelo argumentum!");
       return -1;
    }

    }
    
    return 0;
}