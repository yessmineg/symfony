<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Reclamation
 *
 * @ORM\Table(name="reclamation")
 * @ORM\Entity
 */
class Reclamation
{
    /**
     * @var int
     *
     * @ORM\Column(name="numero", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $numero;

    /**
     * @var string
     *
     * @ORM\Column(name="commentaire", type="string", length=100, nullable=false)
     */
    private $commentaire;

 /**
 * @var string
 *
 * @ORM\Column(name="typeReclamation", type="string", length=50, nullable=false)
 */
private $typeReclamation;

    public function getNumero(): ?int
    {
        return $this->numero;
    }

    public function getCommentaire(): ?string
    {
        return $this->commentaire;
    }

    public function setCommentaire(string $commentaire): self
    {
        $this->commentaire = $commentaire;

        return $this;
    }


   
   public function getTypereclamation(): ?string
   {
       return $this->typeReclamation;
   }
   
   public function settypeReclamation(string $typeReclamation): self
   {
       $this->typeReclamation = $typeReclamation;
   
       return $this;
   }


}
