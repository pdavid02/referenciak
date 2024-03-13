#ifndef BEADANDO
#define BEADANDO

   void reverse(char * str);

   struct argu{
    char *sorszam;
    int maxhossz;
   };

   void usage();

   void readnwrite(char **fajlok, int hossz, int egesz, char *sorszam);


#endif