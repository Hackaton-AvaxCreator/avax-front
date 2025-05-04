import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
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
  ArrowLeft,
  Code,
  ExternalLink,
  Globe,
  ImageIcon,
  Lightbulb,
  Loader2,
  Music,
  Share2,
  ShoppingCart,
  User,
  Users,
  Video,
} from 'lucide-react';

// Modelo simplificado de proyecto NFT
interface ProjectNFT {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  creator: string;
  creatorInfo?: string;
  category: string;
  thumbnail: string;
  price: number; // Precio en AVAX
  tags: string[];
  createdAt?: string;
  links?: {
    title: string;
    url: string;
  }[];
}

// Datos de ejemplo
const mockProjectsNFT: ProjectNFT[] = [
  /* {
    id: '1',
    title: 'Documental sobre Comunidades Indígenas',
    description: 'Un documental que explora las tradiciones y desafíos actuales de las comunidades indígenas en Colombia.',
    longDescription: `Este documental busca dar voz a las comunidades indígenas de diversas regiones de Colombia, destacando tanto sus tradiciones ancestrales como los desafíos contemporáneos que enfrentan.
    
    A través de entrevistas, seguimiento de la vida cotidiana y material de archivo, el proyecto pretende crear un retrato completo que muestre la riqueza cultural, los conocimientos tradicionales, la lucha por la preservación territorial y la adaptación a un mundo en constante cambio.
    
    El objetivo principal es generar conciencia sobre la importancia de estas culturas, su papel en la protección de los ecosistemas y la necesidad de políticas más inclusivas que respeten sus derechos y autonomía.
    
    Al adquirir este NFT, estás apoyando directamente la producción de este documental y obtendrás:
    - Acceso anticipado al documental completo
    - Créditos especiales como patrocinador
    - Una colección de fotografías exclusivas
    - Invitación a la premier virtual`,
    creator: 'MariaFilms',
    creatorInfo: 'Documentalista independiente especializada en temas sociales y culturales. Ha trabajado con comunidades en diversos países de América Latina durante los últimos 8 años.',
    category: 'video',
    thumbnail: 'https://images.pexels.com/photos/7578536/pexels-photo-7578536.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 3200,
    tags: ['documental', 'cultura', 'indígena', 'colombia', 'social'],
    createdAt: '2024-12-10T14:30:00Z',
    links: [
      {
        title: 'Sitio web del proyecto',
        url: 'https://example.com/proyecto-documental'
      },
      {
        title: 'Instagram',
        url: 'https://instagram.com/mariafilms'
      }
    ]
  }, */
  {
    id: '2',
    title: 'Álbum de Música Folklórica Experimental',
    description: 'Un álbum que fusiona instrumentos tradicionales latinoamericanos con música electrónica y experimental.',
    longDescription: `Este proyecto musical busca crear puentes entre las tradiciones musicales latinoamericanas y las expresiones contemporáneas, combinando instrumentos ancestrales como charangos, quenas, marimbas y tambores con sintetizadores, samplers y procesadores digitales.
    
    El álbum contará con 10 temas originales, cada uno representando diferentes regiones y tradiciones, pero con un enfoque experimental que permita llevar estos sonidos a nuevos territorios sonoros.
    
    Colaborarán músicos tradicionales de diferentes comunidades, quienes aportarán no solo su talento sino también sus conocimientos sobre las raíces de estas expresiones culturales.
    
    Al adquirir este NFT obtendrás:
    - Álbum completo en formato digital de alta resolución
    - Pistas exclusivas no incluidas en la versión comercial
    - Arte digital único inspirado en la música
    - Acceso a sesiones virtuales con los creadores`,
    creator: 'SonidosRaíces',
    creatorInfo: 'Colectivo de músicos y productores dedicados a la exploración de las raíces musicales latinoamericanas y su fusión con elementos contemporáneos.',
    category: 'music',
    thumbnail: 'https://images.pexels.com/photos/4709822/pexels-photo-4709822.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 2100,
    tags: ['música', 'folklore', 'experimental', 'electrónica'],
    createdAt: '2025-01-05T10:15:00Z',
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

// Función para formatear fecha
const formatDate = (dateString?: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isConnected } = useWallet();
  const [isLoading, setIsLoading] = useState(true);
  const [project, setProject] = useState<ProjectNFT | null>(null);
  const [openPurchaseDialog, setOpenPurchaseDialog] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);

  // Cargar datos del proyecto NFT
  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      const foundProject = mockProjectsNFT.find(p => p.id === id);
      if (foundProject) {
        setProject(foundProject);
      }
      setIsLoading(false);
    }, 500);
  }, [id]);

  // Manejar compra del NFT
  const handlePurchase = () => {
    if (!isConnected) {
      toast({
        title: "Wallet no conectada",
        description: "Conecta tu wallet para comprar este proyecto NFT.",
        variant: "destructive",
      });
      return;
    }

    setOpenPurchaseDialog(true);
  };

  // Procesar la compra
  const processPurchase = async () => {
    if (!project) return;

    setIsPurchasing(true);

    try {
      // En una implementación real, aquí se llamaría al smart contract
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simular transacción

      toast({
        title: "Compra exitosa",
        description: `Has adquirido el proyecto NFT '${project.title}' por ${project.price} AVAX`,
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-2">Proyecto no encontrado</h2>
        <p className="text-muted-foreground mb-4">
          El proyecto que buscas no existe o ha sido eliminado.
        </p>
        <Button onClick={() => navigate('/projects')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al Marketplace
        </Button>
      </div>
    );
  }

  const categoryColorClass = getCategoryColor(project.category);

  return (
    <div className="space-y-8">
      {/* Botón de regreso */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate('/projects')}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver al Marketplace
      </Button>

      {/* Cabecera del proyecto */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="relative rounded-lg overflow-hidden aspect-video mb-4">
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

          <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
          <p className="text-muted-foreground mt-2 mb-4">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-xs py-0.5 px-2"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-muted rounded-full flex items-center justify-center">
              <User className="h-5 w-5" />
            </div>
            <div>
              <div className="font-medium">{project.creator}</div>
              {project.createdAt && (
                <div className="text-xs text-muted-foreground">
                  Creado el {formatDate(project.createdAt)}
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Información del NFT</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-md border bg-muted/40">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gold-500 mb-1">{project.price} AVAX</div>
                  <p className="text-sm text-muted-foreground">Precio del proyecto NFT</p>
                </div>
              </div>

              <div className="space-y-2 pt-2 text-sm">
                <p>Al comprar este NFT, adquieres:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Propiedad digital del proyecto</li>
                  <li>Acceso a contenido exclusivo</li>
                  <li>Posibilidad de reventa</li>
                </ul>
              </div>

              <div className="space-y-2 pt-2">
                <Button
                  onClick={handlePurchase}
                  className="w-full bg-gold-500 hover:bg-gold-600 text-black"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Comprar Ahora
                </Button>
                <Button variant="outline" className="w-full gap-1">
                  <Share2 className="h-4 w-4" />
                  Compartir
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Descripción del proyecto */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Acerca del Proyecto</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <div className="whitespace-pre-line">
                  {project.longDescription}
                </div>
              </div>

              {project.links && project.links.length > 0 && (
                <div className="mt-6 space-y-2">
                  <h3 className="text-lg font-semibold">Enlaces</h3>
                  <div className="space-y-2">
                    {project.links.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary hover:underline"
                      >
                        <Globe className="h-4 w-4" />
                        {link.title}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {project.creatorInfo && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Acerca del Creador</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center">
                    <User className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold">{project.creator}</h3>
                </div>
                <p>{project.creatorInfo}</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="md:block">
          <Card className="mt-4 md:mt-0">
            <CardHeader>
              <CardTitle>Detalles del NFT</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ID del Proyecto:</span>
                  <span className="font-mono">{project.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Categoría:</span>
                  <span className="flex items-center gap-1">
                    <CategoryIcon category={project.category} />
                    <span>{project.category.charAt(0).toUpperCase() + project.category.slice(1)}</span>
                  </span>
                </div>
                {project.createdAt && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fecha de creación:</span>
                    <span>{formatDate(project.createdAt)}</span>
                  </div>
                )}
              </div>

              <div className="p-3 rounded-md bg-muted/40 border">
                <p className="text-sm text-muted-foreground text-center">
                  Este NFT está alojado en la blockchain de Avalanche, garantizando su autenticidad y propiedad digital.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Diálogo de compra */}
      <Dialog open={openPurchaseDialog} onOpenChange={setOpenPurchaseDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Comprar Proyecto NFT</DialogTitle>
            <DialogDescription>
              {`Estás a punto de comprar "${project.title}" como NFT`}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="space-y-4">
              <div className="flex flex-col gap-2 p-4 rounded-md border bg-muted/5">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Contrato:</span>
                  <span className="font-mono text-sm text-avalanche-500">
                    {project.id}...{project.id.slice(-4)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Estándar:</span>
                  <span className="text-sm text-web3-500">ARC-721</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Blockchain:</span>
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-avalanche-500">Avalanche</span>
                    <span>• C-Chain</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Tarifa Red:</span>
                  <span className="text-sm text-muted-foreground">~0.001 AVAX</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="font-medium">Total Estimado:</span>
                  <span className="text-xl font-bold text-gold-500">
                    {(project.price + 0.001).toFixed(3)} AVAX
                  </span>
                </div>
              </div>

              <div className="text-sm text-muted-foreground p-2 border rounded-md bg-muted/10">
                <p className="flex items-center gap-2">
                  <span>⚠️</span>
                  Transacción irreversible - Verifica todos los detalles antes de confirmar
                </p>
              </div>
            </div>
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

export default ProjectDetail;