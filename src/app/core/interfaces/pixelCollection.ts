export interface Punto {
    x: number;
    y: number;
}

export class PixelCollection {
    pixeles: Punto[] = [];
    xMinima = 0
    xMaxima = 0
    yMinima = 0
    yMaxima = 0
    grados = 0

    constructor(x: number, y: number) {
        this.agegarPixel(x, y)
        this.xMinima = x
        this.xMaxima = x
        this.yMinima = y
        this.yMaxima = y
    }

    agegarPixel(x: number, y: number) {
        this.pixeles.push({ x, y });
        this.xMinima = x < this.xMinima ? x : this.xMinima;
        this.xMaxima = x > this.xMaxima ? x : this.xMaxima;
        this.yMinima = y < this.yMinima ? y : this.yMinima;
        this.yMaxima = y > this.yMaxima ? y : this.yMaxima;
    }


    estaCerca(x: number, y: number) {
        const distX = (x < this.xMinima) ? this.xMinima - x : (x > this.xMaxima) ? x - this.xMaxima : 0;
        const distY = (y < this.yMinima) ? this.yMinima - y : (y > this.yMaxima) ? y - this.yMaxima : 0;
        return (distX + distY) < 50;
    }

    dibujar(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = '#f00'
        ctx.lineWidth = 4
        ctx.beginPath()
        const x = this.xMinima
        const y = this.yMinima
        const width = this.xMaxima - this.xMinima
        const height = this.yMaxima - this.yMinima
        ctx.strokeRect(x, y, width, height)

        const centroX = x + (width / 2)
        const centroY = y + (height / 2)
        ctx.beginPath()
        ctx.fillStyle = '#00F'
        ctx.arc(centroX, centroY, 5, 0, 2 * Math.PI)
        ctx.fill()

        const izquierda = x + (width * 0.1);
        const derecha = x + (width * 0.9);

        let sumaYIzq = 0, cuentaYIzq = 0, sumaYDer = 0, cuentaYDer = 0;

        for (const pixel of this.pixeles) {
            if (pixel.x <= izquierda) {
                sumaYIzq += pixel.y;
                cuentaYIzq++;
            } else if (pixel.x >= derecha) {
                sumaYDer += pixel.y;
                cuentaYDer++;
            }
        }

        const promedioYIzq = cuentaYIzq ? sumaYIzq / cuentaYIzq : 0;
        const promedioYDer = cuentaYDer ? sumaYDer / cuentaYDer : 0;

        ctx.beginPath();
        ctx.arc(x, promedioYIzq, 5, 0, 2 * Math.PI);
        ctx.arc(this.xMaxima, promedioYDer, 5, 0, 2 * Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.strokeStyle = '#0f0'
        ctx.moveTo(this.xMinima, promedioYIzq)
        ctx.lineTo(this.xMaxima, promedioYDer)
        ctx.stroke()

        const diffY = promedioYDer - promedioYIzq;
        const diffX = this.xMaxima - this.xMinima

        const radianes = Math.atan(diffY / diffX)
        this.grados = radianes * (180 / Math.PI)
    }

    static unirArreglos(pixelCollection: PixelCollection[]): PixelCollection[] {
        let salir: boolean = false

        for (let p1 = 0; p1 < pixelCollection.length; p1++) {
            for (let p2 = 0; p2 < pixelCollection.length; p2++) {
                if (p1 == p2) continue
                const pixel1 = pixelCollection[p1]
                const pixel2 = pixelCollection[p2]

                const intersecion =
                    pixel1.xMinima < pixel2.xMaxima &&
                    pixel1.xMaxima > pixel2.xMinima &&
                    pixel1.yMinima < pixel2.yMaxima &&
                    pixel1.yMaxima < pixel2.yMinima

                if (intersecion) {
                    for (let p = 0; p < pixel2.pixeles.length; p++) {
                        pixel1.agegarPixel(
                            pixel2.pixeles[p].x,
                            pixel2.pixeles[p].y
                        )
                    }
                    pixelCollection.splice(p2, 1)
                    salir = true
                    break
                }
            }
            if (salir) break
        }

        if (salir) return this.unirArreglos(pixelCollection)
        else return pixelCollection
    }
}
