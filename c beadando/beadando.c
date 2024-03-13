#include <stdio.h>
#include <string.h>
#include <stdlib.h>

void reverse(char *str)
{
    int vege = (strlen(str))-1;
    char temp;

    for(int i = 0; i < vege; i++)
    {
        temp = str[i];
        str[i] = str[vege];
        str[vege] = temp;
        vege--;
    }
}

void usage(){
    printf("Usage:\n");
        printf("\trev [SHOW LINE NUMBERS] [MAX LINE LENGTH] files...\n");
}


void readnwrite(char **fajlok, int hossz, int egesz, char *sorszam){
        int size = 8;
        char **sorok = malloc(size*(sizeof(char*)));

         if (sorok == NULL) {
            printf("Memory allocation failed!\n");
             exit(1);
            }

        for(int i = 0; i < size; i++)
        {
            sorok[i] = malloc(hossz+1);
            if (sorok[i] == NULL) {
            printf("Memory allocation failed!\n");
            exit(1);
            }
        }

        char input = 1;
        if(egesz == 0)
        {
            egesz = 1;
            input = 0;
        }
        

        for(int i = 0; i < egesz; i++)
        {
            
            FILE *ptr;
            if(input == 0)
            {
                ptr = stdin;
            }
            else{
            ptr = fopen(fajlok[i], "r");
            }

            if(ptr == NULL)
            {
                printf("File opening unsuccessful: <%s>\n", fajlok[i]);
                continue;
                
            }
           else {
                int count = 0;
                int k = 0;
                char ch;
                int ujszo = 0;
                
                while(count != hossz+1)
                {
                      
                    if(k == size-1)
                    {
                        size = size*2;
                        sorok = realloc(sorok, size*sizeof(char*));
                        if (sorok == NULL) {
                            printf("Memory allocation failed!\n");
                            exit(1);
                            }

                        for(int i = size/2; i < size; i++)
                        {
                            sorok[i] = malloc(hossz+1);
                            if (sorok[i] == NULL) {
                            printf("Memory allocation failed!\n");
                            exit(1);
                            }
                        }


                    }
                    ch = getc(ptr);
                    
                    
                    if(count == hossz)
                    {
                        //printf("HALLO!!");
                        sorok[k][count] = '\0';
                        ujszo =1;
                        k++;
                        count = 0;
                    }
                    else if(ch == '\n')
                    {
                        sorok[k][count] = '\0';
                        ujszo =0;
                        k++;
                        count = 0;
                    }
                    else if(ujszo == 0)
                    {
                        
                        if(ch != '\n')
                        {
                         sorok[k][count] = ch;
                         count++;
                        }
                    }


                    if(feof(ptr))
                        {
                            
                            break;
                        
                        }
                   
                }

                int s = 0;

                for(int i = 0; i < k; i++)
                {
                    if(strcmp(sorok[i], "") != 0)
                    {
                        s++;
                    }
                }

                for(int i = k-1; i >= 0; i--)
                {
                   if(strcmp(sorok[i], "") != 0)
                   {
                        if(strcmp(sorszam, "nolinenums") == 0)
                        {
                        reverse(sorok[i]);
                        printf("%s\n", sorok[i]);
                        }
                        else
                        {
                          reverse(sorok[i]);
                          printf("%d %s\n", s,sorok[i]);
                          s--;
                        }
                   }
                    
                }


                /*for(int i = 0; i < k; i++)
                {
                   
                        if(strcmp(sorszam, "nolinenums") == 0)
                        {
                        //reverse(sorok[i]);
                        printf("%s\n", sorok[i]);
                        }
                        else
                        {
                          //reverse(sorok[i]);
                          printf("%d %s\n", s,sorok[i]);
                          s--;
                        }
                    
                }*/
           }
           fclose(ptr);
        }
}




