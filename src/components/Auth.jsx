import React from 'react';
import { auth } from '../firebase/config';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

const Auth = () => {
  const { toast } = useToast();
  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      toast({
        title: "¡Bienvenido!",
        description: `Has iniciado sesión como ${result.user.displayName || result.user.email}`,
        duration: 5000,
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error al iniciar sesión",
        description: "Hubo un problema al intentar iniciar sesión con Google",
        duration: 5000,
      });
      console.error(err);
    }
  };

  return (
    <div className=" h-[700px] flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <CardTitle className="text-2xl font-bold text-center">
            Bienvenido a Scrapester
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Inicia sesión para acceder a todas las funcionalidades de la plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleSignIn}
              className="w-full h-12 text-base hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <svg 
                className="mr-3 h-6 w-6 left-4" 
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" 
                  fill="#4285F4"
                />
                <path 
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" 
                  fill="#34A853"
                />
                <path 
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" 
                  fill="#FBBC05"
                />
                <path 
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" 
                  fill="#EA4335"
                />
              </svg>
              Continuar con Google
            </Button>
            
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Al iniciar sesión, aceptas nuestros 
                <a href="/terms" className="text-primary hover:underline ml-1">
                  términos y condiciones
                </a>
              </p>
              
              <div className="flex justify-center gap-2 text-sm text-muted-foreground">
                <a href="/privacy" className="hover:text-foreground hover:underline">
                  Política de privacidad
                </a>
                <span>•</span>
                <a href="/help" className="hover:text-foreground hover:underline">
                  Centro de ayuda
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;