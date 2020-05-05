export default class VideoInserter {
    private videoNum : number;
    categories : Array<any> = [];


    constructor(videoNum : number) {
        this.videoNum = videoNum;
    }


   /*  public insertCategoryDiv(categories) {
        let divInsert = '#category-insert-before-me';

        categories.forEach(category => {
            $(divInsert).before(`
            <button class="category-btn" id="Category-${category}" >${category}</button>
            <div class="${category}" id="Category-${category}">     
              <div id = 'label-insert-before-me'></div>
            </div>
        `);
            this.insertLabelDiv(category); 
        });
    } */

    /* public insertLabelDiv(category) {
        let divInsert = '#label-insert-before-me';

        category.forEach(label => {
            $(divInsert).before(`  
              <button class="label-btn" id="Label-${label}">${label}</button>  
                <div class="Label-Body" id="Label-Body-${label}">
                    <div id = 'video-insert-before-me'></div>
                </div>
        `);
            label.forEach(video => {
                this.insertVideoDiv(video.videoNum);
            });
        });
    } */
    
    private getBookmarksDiv(oldNumBookmarks: number) : string {
        let div = ""
        for (let i = 1; i < oldNumBookmarks + 1; i++) {
            div += `
                <button id="video-${this.videoNum}-link-${i}" class="timestampBtn" >hh:mm:ss</button>  

                <input id="video-${this.videoNum}-time-${i}" type='time' class="without_ampm" step="1" required value="00:00:00"> 
                <div>
                <textarea class="bookmark-notes" id="video-${this.videoNum}-bm-${i}" cols="35"></textarea>
                </div>
            `
        }
        return div;
    }

    public insertVideoDiv(videoNum : number, oldNumBookmarks: number, videoId: string) {
        //console.log("Inserting labelNum: " + labelNum + ", videoNum: " + videoNum);
        this.videoNum = videoNum;
        let divInsert = '.Label-Body';
        let bookmarksDiv : String = this.getBookmarksDiv(oldNumBookmarks);

        $(divInsert).append(`
            <div class="Label-Video">
                <h3 id="video-${videoNum}-title">Placeholder Title for ${videoNum}</h3>   

                <div class="panel-body">
                    <div class = "video-section" id="video-${videoNum}"></div>
                    <p id="video-${videoNum}-vid" style="color:white;">${videoId}</p>

                    <div class="video-text">
            
                        <div class="dialog-notes">
                        <label for="dialog-Notes" class="boxTitle">Notes</label> 
                        <div>
                            <textarea id="video-${videoNum}-notes" cols="35"></textarea>
                        </div>           
                        </div>

                        <div class="boxTitle"><b>Bookmarks</b></div>

                        <div class="all-bookmarks">
                        <div class="video-bookmarks">                        
                            ${bookmarksDiv}
                        </div>

                        <div class="dialog-bookmarks" id="video-${videoNum}-new-bm">
                    
                        </div>
                    
                        <div class="dialog-footer">
                            <button type="button" id="video-${videoNum}-submit-book" class="submitBtn btn btn-success">Submit</button>
                        </div>
                        </div>

                        <button onClick="deleteVideo()" id ="video-${videoNum}-delete-book" class="videoDeleteButtons">Delete</button>
                    </div>

                    <div class="dialog-bookmarks" id="video-${videoNum}-new-bm">
                    </div>
                

                </div>
            </div>
        `);
    }
}