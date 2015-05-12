package hr.fer.projekt.komponente.model;

import javax.persistence.Cacheable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@Cacheable(true)
public class Component {

    private Long id;
    private String name;
    private String data;
    private String image;
    private Integer inPins;
    private Integer outPins;
    private Boolean isPrivate;
    private AppUser author;

    @Id
    @GeneratedValue
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Column(length = 50, nullable = false)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(length = 4194304)
    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    @Column(length = 524288)
    public String getImage() {
        return image;
    };

    public void setImage(String image) {
        this.image = image;
    }

    @Column(nullable = false)
    public Integer getInPins() {
        return inPins;
    }

    public void setInPins(Integer inPins) {
        this.inPins = inPins;
    }

    @Column(nullable = false)
    public Integer getOutPins() {
        return outPins;
    }

    public void setOutPins(Integer outPins) {
        this.outPins = outPins;
    }

    @Column(nullable = false)
    public Boolean getIsPrivate() {
        return isPrivate;
    }

    public void setIsPrivate(Boolean isPrivate) {
        this.isPrivate = isPrivate;
    }

    @ManyToOne
    @JoinColumn(nullable = false)
    public AppUser getAuthor() {
        return author;
    }

    public void setAuthor(AppUser author) {
        this.author = author;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((data == null) ? 0 : data.hashCode());
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((name == null) ? 0 : name.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Component other = (Component) obj;
        if (data == null) {
            if (other.data != null)
                return false;
        } else if (!data.equals(other.data))
            return false;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        if (name == null) {
            if (other.name != null)
                return false;
        } else if (!name.equals(other.name))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "Component [name=" + name + ", data=" + data + ", id=" + id + "]";
    }

}
