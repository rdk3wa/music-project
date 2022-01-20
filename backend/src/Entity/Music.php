<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Controller\MusicSearchController;
use App\Repository\MusicRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=MusicRepository::class)
 * @ApiResource(
 *  normalizationContext={"groups"={"music:read"}},
 *  denormalizationContext={"groups"={"music:write"}},
 *  collectionOperations={"get", "post", "search": {
 *      "method":"GET",
 *      "path":"/music/search",
 *      "controller":MusicSearchController::class,
 *      "pagination_enabled": false,
 *      "normalization_context": {"groups":{"music:search"}}
 *  }}
 * )
 */
class Music
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"music:read", "album:read", "artist:read", "music:search"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"music:read", "album:read", "artist:read", "music:search", "music:write"})
     */
    private $title;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"music:read", "album:read", "artist:read", "music:search", "music:write"})
     */
    private $year;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"music:read", "album:read", "artist:read", "music:write"})
     */
    private $duration;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"music:read", "album:read", "artist:read"})
     */
    private $file;

    /**
     * @ORM\ManyToOne(targetEntity=Album::class, inversedBy="musics")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"music:read", "music:search", "music:write"})
     */
    private $album;

    /**
     * @ORM\ManyToOne(targetEntity=Type::class, inversedBy="musics")
     * @Groups({"music:read", "music:write"})
     */
    private $type;

    public function __construct()
    {
        $this->file = "assets/music/titre".rand(1, 4).".mp3";
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

    public function getYear(): ?int
    {
        return $this->year;
    }

    public function setYear(?int $year): self
    {
        $this->year = $year;

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

    public function getAlbum(): ?Album
    {
        return $this->album;
    }

    public function setAlbum(?Album $album): self
    {
        $this->album = $album;

        return $this;
    }

    public function getType(): ?Type
    {
        return $this->type;
    }

    public function setType(?Type $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getFile()
    {
        return $this->file;
    }

    public function setFile($file): self
    {
        $this->file = $file;

        return $this;
    }
}
