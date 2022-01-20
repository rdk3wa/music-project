<?php

namespace App\Entity;

use App\Controller\ArtistSearchController;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ArtistRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=ArtistRepository::class)
 * @ApiResource(
 *  normalizationContext={"groups"={"artist:read"}},
 *  denormalizationContext={"groups"={"artist:write"}},
 *  collectionOperations={"get", "post", "search": {
 *      "method":"GET",
 *      "path":"/artist/search",
 *      "controller":ArtistSearchController::class,
 *      "pagination_enabled": false,
 *      "normalization_context": {"groups":{"artist:search"}}
 *  }}
 * )
 */
class Artist
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"artist:read", "music:read", "album:read", "artist:search", "album:write"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"artist:read", "music:read", "album:read", "artist:search", "artist:write"})
     */
    private $name;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"artist:read", "music:read", "album:read", "artist:write"})
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"artist:read", "music:read", "album:read", "artist:search"})
     */
    private $photo;

    /**
     * @ORM\OneToMany(targetEntity=Album::class, mappedBy="artist", orphanRemoval=true)
     *  @Groups({"artist:read"})
     */
    private $albums;

    public function __construct()
    {
        $this->albums = new ArrayCollection();
        $this->photo = "assets/images/profile/photo.png";
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Collection|Album[]
     */
    public function getAlbums(): Collection
    {
        return $this->albums;
    }

    public function addAlbum(Album $album): self
    {
        if (!$this->albums->contains($album)) {
            $this->albums[] = $album;
            $album->setArtist($this);
        }

        return $this;
    }

    public function removeAlbum(Album $album): self
    {
        if ($this->albums->removeElement($album)) {
            // set the owning side to null (unless already changed)
            if ($album->getArtist() === $this) {
                $album->setArtist(null);
            }
        }

        return $this;
    }

    /**
     * @return mixed
     */
    public function getPhoto()
    {
        return $this->photo;
    }

    /**
     * @param mixed $photo
     */
    public function setPhoto($photo): void
    {
        $this->photo = $photo;
    }
}
