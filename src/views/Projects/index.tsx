import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import { useToast } from '../../hooks/use-toast';
import { useWallet } from '../../hooks/useWallet';
import {
  Code,
  Lightbulb,
  Loader2,
  Music,
  Plus,
  ShoppingCart,
  Users,
  Video,
  Image as ImageIcon,
} from 'lucide-react';

// Modelo simplificado de proyecto como NFT
interface ProjectNFT {
  id: string;
  title: string;
  description: string;
  creator: string;
  category: string;
  thumbnail: string;
  price: number; // Precio en AVAX
  tags: string[];
}

// Datos de ejemplo
const mockProjectsNFT: ProjectNFT[] = [
  {
    id: '1',
    title: 'Documental sobre Comunidades Indígenas',
    description: 'Un documental que explora las tradiciones y desafíos actuales de las comunidades indígenas en Colombia.',
    creator: 'MariaFilms',
    category: 'video',
    thumbnail: 'https://images.pexels.com/photos/7578536/pexels-photo-7578536.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 3200,
    tags: ['documental', 'cultura', 'indígena'],
  },
  {
    id: '2',
    title: 'Álbum de Música Folklórica Experimental',
    description: 'Un álbum que fusiona instrumentos tradicionales latinoamericanos con música electrónica y experimental.',
    creator: 'SonidosRaíces',
    category: 'music',
    thumbnail: 'https://images.pexels.com/photos/4709822/pexels-photo-4709822.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 2100,
    tags: ['música', 'folklore', 'experimental'],
  },
  {
    id: '3',
    title: 'Aplicación Web3 para Economía Circular',
    description: 'Desarrollo de una dApp que conecta productores locales con consumidores, utilizando tokens para incentivar prácticas sostenibles.',
    creator: 'EcoBlockchain',
    category: 'tech',
    thumbnail: 'https://images.pexels.com/photos/8052220/pexels-photo-8052220.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 3500,
    tags: ['blockchain', 'sostenibilidad', 'dApp'],
  },
  {
    id: '4',
    title: 'Serie Ilustrada sobre Mitos Latinoamericanos',
    description: 'Colección de ilustraciones digitales que reimaginan mitos y leyendas de diferentes países de América Latina.',
    creator: 'MitosVisuales',
    category: 'art',
    thumbnail: 'https://images.pexels.com/photos/6507486/pexels-photo-6507486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 1800,
    tags: ['ilustración', 'mitos', 'leyendas'],
  },
  {
    id: '5',
    title: 'Plataforma Educativa sobre Biodiversidad',
    description: 'Un recurso educativo interactivo sobre la biodiversidad de ecosistemas latinoamericanos.',
    creator: 'EduNaturaleza',
    category: 'education',
    thumbnail: 'https://images.pexels.com/photos/2563129/pexels-photo-2563129.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 1200,
    tags: ['educación', 'biodiversidad', 'ecología'],
  },
  {
    id: '6',
    title: 'Podcast sobre Emprendimiento Social',
    description: 'Serie de episodios que documenta historias de emprendedores latinoamericanos que están creando impacto social positivo.',
    creator: 'VocesDeImpacto',
    category: 'audio',
    thumbnail: 'https://images.pexels.com/photos/6953867/pexels-photo-6953867.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 900,
    tags: ['podcast', 'emprendimiento', 'impacto social'],
  },
];

// Componente para el ícono de categoría
const CategoryIcon = ({ category }: { category: string }) => {
  switch (category) {
    case 'video':
      return <Video className="h-5 w-5" />;
    case 'music':
      return <Music className="h-5 w-5" />;
    case 'art':
      return <ImageIcon className="h-5 w-5" />;
    case 'tech':
      return <Code className="h-5 w-5" />;
    case 'education':
      return <Lightbulb className="h-5 w-5" />;
    case 'audio':
      return <Music className="h-5 w-5" />;
    default:
      return <Lightbulb className="h-5 w-5" />;
  }
};

// Función para obtener el color de fondo basado en la categoría
const getCategoryColor = (category: string): string => {
  switch (category) {
    case 'video':
      return 'bg-avalanche-500/10 text-avalanche-500';
    case 'music':
      return 'bg-web3-500/10 text-web3-500';
    case 'art':
      return 'bg-gold-500/10 text-gold-500';
    case 'tech':
      return 'bg-impact-500/10 text-impact-500';
    case 'education':
      return 'bg-gold-500/10 text-gold-500';
    case 'audio':
      return 'bg-web3-500/10 text-web3-500';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const Projects = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isConnected } = useWallet();
  const [selectedProject, setSelectedProject] = useState<ProjectNFT | null>(null);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [openPurchaseDialog, setOpenPurchaseDialog] = useState(false);

  // Manejar compra
  const handlePurchase = (project: ProjectNFT) => {
    if (!isConnected) {
      toast({
        title: "Wallet no conectada",
        description: "Conecta tu wallet para comprar este proyecto NFT.",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedProject(project);
    setOpenPurchaseDialog(true);
  };

  // Procesar compra
  const processPurchase = async () => {
    if (!selectedProject) return;
    
    setIsPurchasing(true);
    
    try {
      // En una implementación real, aquí se llamaría al smart contract
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simular transacción
      
      toast({
        title: "Compra exitosa",
        description: `Has adquirido el proyecto NFT '${selectedProject.title}' por ${selectedProject.price} AVAX`,
      });
      
      setOpenPurchaseDialog(false);
    } catch (error) {
      toast({
        title: "Error al procesar la compra",
        description: "Ha ocurrido un error al procesar tu compra. Por favor, intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold">Marketplace de Proyectos</h1>
          <p className="text-muted-foreground">
            Explora y adquiere proyectos únicos como NFTs
          </p>
        </div>
        <Button onClick={() => navigate('/create-project')}>
          <Plus className="mr-2 h-4 w-4" />
          Crear Proyecto NFT
        </Button>
      </motion.div>

      {/* Lista de proyectos NFT */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockProjectsNFT.map((project, index) => {
          const categoryColorClass = getCategoryColor(project.category);
          
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="overflow-hidden h-full flex flex-col">
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={project.thumbnail} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <div className={`rounded-full p-1.5 ${categoryColorClass}`}>
                      <CategoryIcon category={project.category} />
                    </div>
                  </div>
                </div>
                
                <CardHeader className="pb-2 flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{project.creator}</span>
                  </div>
                  
                  <CardTitle className="text-lg line-clamp-2">{project.title}</CardTitle>
                  <p className="text-muted-foreground line-clamp-2 text-sm mt-2">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mt-3">
                    {project.tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="outline" 
                        className="text-xs py-0 px-1.5"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0 pb-2">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-lg text-gold-500">{project.price} AVAX</div>
                  </div>
                </CardContent>
                
                <CardFooter className="pt-2">
                  <div className="grid grid-cols-2 gap-2 w-full">
                    <Button 
                      variant="outline" 
                      onClick={() => navigate(`/projects/${project.id}`)}
                      className="w-full"
                    >
                      Ver detalles
                    </Button>
                    <Button 
                      onClick={() => handlePurchase(project)}
                      className="w-full bg-gold-500 hover:bg-gold-600 text-black"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Comprar
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Diálogo de compra */}
      <Dialog open={openPurchaseDialog} onOpenChange={setOpenPurchaseDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Comprar Proyecto NFT</DialogTitle>
            <DialogDescription>
              {selectedProject && `Estás a punto de comprar "${selectedProject.title}" como NFT`}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            {selectedProject && (
              <div className="space-y-4">
                <div className="flex flex-col gap-2 p-4 rounded-md border">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Proyecto:</span>
                    <span>{selectedProject.title}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Creador:</span>
                    <span>{selectedProject.creator}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Precio:</span>
                    <span className="text-xl font-bold text-gold-500">
                      {selectedProject.price} AVAX
                    </span>
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  <p>Al comprar este NFT, adquieres la propiedad digital del proyecto. Esta transacción quedará registrada en la blockchain de Avalanche.</p>
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setOpenPurchaseDialog(false)}
            >
              Cancelar
            </Button>
            <Button 
              onClick={processPurchase}
              disabled={isPurchasing}
              className="bg-gold-500 hover:bg-gold-600 text-black"
            >
              {isPurchasing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Procesando...
                </>
              ) : (
                "Confirmar Compra"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Projects;