export default class VideoInserter {
    private videoNum : number;
    categories : Array<any> = [];


    constructor(videoNum : number) {
        this.videoNum = videoNum;
    }


    public insertCategoryDiv(categories) {
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
    }

    public insertLabelDiv(category) {
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
    }
    

    public insertVideoDiv(videoNum : number) {
        //console.log("Inserting labelNum: " + labelNum + ", videoNum: " + videoNum);

        let divInsert = '#video-insert-before-me';

        $(divInsert).before(`
            <h1>Hello! ${videoNum} </h1>
            <div class="panel-body">
                <div class = "video-section" id="video-${videoNum}"></div>
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
                        
                        <button id="video-${videoNum}-link-1" class="timestampBtn" >hh:mm:ss</button>  

                        <input id="video-${videoNum}-time-1" type='time' class="without_ampm" step="1" required value="00:01:10"> 
                        <div>
                        <textarea class="bookmark-notes" id="video-${videoNum}-bm-1" cols="35"></textarea>
                        </div>
                    </div>


                    <div class="dialog-bookmarks">
                        <div class="boxTitle"><b>Add New Bookmarks</b></div>
                        <button id="video-${videoNum}-link-2" class="timestampBtn" >hh:mm:ss</button>  
                        <input id="video-${videoNum}-time-2" type='time' class="without_ampm" value="00:00:00" step="1" required>  
                        <div>
                        <textarea class="bookmark-notes" id="video-${videoNum}-bm-2" cols="35"></textarea>
                        </div>
                        <button type="button" id="video-${videoNum}-add-bookmark" class="add-bookmark btn btn-primary">Add New</button>
                        <div id="video-${videoNum}-insert-before-me"></div>
                    </div> 

                    
                    <div class="dialog-footer">
                        <button type="button" id="video-${videoNum}-submit-book" class="submitBtn btn btn-success">Submit</button>
                    </div>
                    </div>

                    <button onClick="deleteVideo()" id ="delete-video">Delete</button>
                </div>
            </div>
        `);
    }
}