<?php

namespace App\Entity;

use App\Controller\AlbumSearchController;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\AlbumRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=AlbumRepository::class)
 * @ApiResource(
 *  normalizationContext={"groups"={"album:read"}},
 *  denormalizationContext={"groups"={"album:write"}},
 *  collectionOperations={"get", "post", "search": {
 *      "method":"GET",
 *      "path":"/album/search",
 *      "controller":AlbumSearchController::class,
 *      "pagination_enabled": false,
 *      "normalization_context": {"groups":{"album:search"}}
 *  }}
 * )
 */
class Album
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"album:read", "music:read", "artist:read", "album:search", "music:write"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"album:read", "music:read", "artist:read", "album:search", "album:write"})
     */
    private $title;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"album:read", "music:read", "artist:read", "album:write"})
     */
    private $duration;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"album:read", "music:read", "artist:read", "album:write"})
     */
    private $nbMusic;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"album:read", "music:read", "artist:read", "album:search"})
     */
    private $cover;

    /**
     * @ORM\OneToMany(targetEntity=Music::class, mappedBy="album", orphanRemoval=true)
     * @Groups({"album:read"})
     */
    private $musics;

    /**
     * @ORM\ManyToOne(targetEntity=Artist::class, inversedBy="albums")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"album:read", "music:read", "album:write"})
     */
    private $artist;

    public function __construct()
    {
        $this->musics = new ArrayCollection();
        $this->cover = "assets/images/cover/cover.jpg";
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getDuration(): ?string
    {
        return $this->duration;
    }

    public function setDuration(?string $duration): self
    {
        $this->duration = $duration;

        return $this;
    }

    public function getNbMusic(): ?int
    {
        return $this->nbMusic;
    }

    public function setNbMusic(int $nbMusic): self
    {
        $this->nbMusic = $nbMusic;

        return $this;
    }

    /**
     * @return Collection|Music[]
     */
    public function getMusics(): Collection
    {
        return $this->musics;
    }

    public function addMusic(Music $music): self
    {
        if (!$this->musics->contains($music)) {
            $this->musics[] = $music;
            $music->setAlbum($this);
        }

        return $this;
    }

    public function removeMusic(Music $music): self
    {
        if ($this->musics->removeElement($music)) {
            // set the owning side to null (unless already changed)
            if ($music->getAlbum() === $this) {
                $music->setAlbum(null);
            }
        }

        return $this;
    }

    public function getArtist(): ?Artist
    {
        return $this->artist;
    }

    public function setArtist(?Artist $artist): self
    {
        $this->artist = $artist;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getCover()
    {
        return $this->cover;
    }

    /**
     * @param mixed $cover
     */
    public function setCover($cover): void
    {
        $this->cover = $cover;
    }
}
