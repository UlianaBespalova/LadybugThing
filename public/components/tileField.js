export default class TileField {

    static tile(tileSize = 30, imageUrl, className=null, nodeFlag = false) {

        const newTile = document.createElement('img');
        newTile.src = imageUrl
        newTile.alt = 'tile'
        newTile.classList.add(className, "tileImg")
        newTile.width = tileSize;
        return nodeFlag ? newTile : newTile.outerHTML;
    }

}
