import { MapPin, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ExperienceCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  location: string;
}

const ExperienceCard = ({ id, title, description, image, price, location }: ExperienceCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <Card className="group overflow-hidden border-border bg-card hover:shadow-soft transition-all duration-300 hover:-translate-y-2">
      <Link to={`/experience/${id}`}>
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsFavorited(!isFavorited);
            }}
            className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm p-2 rounded-full hover:bg-background transition-all duration-300 hover:scale-110"
            aria-label="Add to favorites"
          >
            <Heart
              className={`h-5 w-5 transition-colors ${
                isFavorited ? "fill-accent text-accent" : "text-muted-foreground"
              }`}
            />
          </button>
        </div>
      </Link>

      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/experience/${id}`}>
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {title}
            </h3>
          </Link>
          <span className="text-primary font-bold text-lg whitespace-nowrap">${price}</span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>

        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-accent" />
          <span className="line-clamp-1">{location}</span>
        </div>

        <Button variant="outline" size="sm" asChild className="w-full mt-2">
          <Link to={`/experience/${id}`}>View Details</Link>
        </Button>
      </div>
    </Card>
  );
};

export default ExperienceCard;
