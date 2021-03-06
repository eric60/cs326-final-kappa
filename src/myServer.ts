declare var require: any
let http = require('http');
let url = require('url');
let express = require('express');
let faker = require('faker');
​
export class MyServer {
​
	private theDatabase;
​
	// Server stuff: use express instead of http.createServer
	private server = express();
	private router = express.Router();

	constructor(db) {
		this.theDatabase = db;
		// from https://enable-cors.org/server_expressjs.html
		this.router.use((request, response, next) => {
			response.header('Content-Type','application/json');
			response.header('Access-Control-Allow-Origin', '*');
			response.header('Access-Control-Allow-Headers', '*');
			next();
		});
		// Serve static pages from a particular path.
		this.server.use('/', express.static('../static'));
		this.server.use(express.json());
		this.server.use('/', this.router);

		this.router.all('/user/signup')
		this.router.all('user/signin')

		this.router.post('/video/:username/create', this.createVideoHandler.bind(this))
		this.router.all('/video/:username/read', this.readVideoHandler.bind(this))
		this.router.all('/video/:username/readAll', this.readAllVideoHandler.bind(this))
		this.router.all('/video/:username/update', this.updateVideoHandler.bind(this))
		this.router.all('/video/:username/delete', this.deleteVideoHandler.bind(this))

		// Set a fall-through handler if nothing matches.
		this.router.get('*', async (request, response) => {
			response.send(JSON.stringify({ "result" : "error" }));
		});

	}
	
	public listen(port) : void  {
		this.server.listen(port);
	}
	
	// ------------------------- CRUD handlers ------------------------------------
    
    private async createVideoHandler(request, response) : Promise<void> {
		// get video object from front end
		let username = request.params['username'];

		console.log('username: ' + username);
		let videoObj = request.body.videoObj;
	
		console.log(videoObj);

		await this.createVideo(username, videoObj, response);
	}

	private async readVideoHandler(request, response) : Promise<void> {
		let username = request.params['username'];
		let category = request.query.category;
		let label = request.query.label;
		console.log('------ username, category, label: ' + username + ", " + category + " , " + label);
		await this.readVideo(username, category, label, response);
	}

	private async readAllVideoHandler(request, response) : Promise<void> {
		let username = request.params['username'];
		await this.readAllVideos(username, response);
	}

	private async updateVideoHandler(request, response) : Promise<void> {
		console.log("in updateVideoHandler");
		let username = request.params['username'];
		let videoId = request.params['videoId'];
		let videoObj = request.body.videoObj;
		await this.updateVideo(username, videoId, videoObj, response);
	}
	
	private async deleteVideoHandler(request, response) : Promise<void> {
		console.log("in deleteVideoHandler")
		// get video object from front end
		//let videoObj = request.body.videoObj;
		
		let username = request.params['username'];
		let videoId = request.body.videoObj.videoUrl;
		console.log("delvideoHandler username: " + username);
		console.log("delvideoHandler videoId: " + videoId);
		await this.deleteVideo(username, videoId, response);
    }
​
   // ---------------------------- CRUD functions -------------------------------------

    public async createVideo(username: string, videoObj: object, response) : Promise<void> {
		console.log("creating video...")

		let found = await this.theDatabase.isFound(username, videoObj);
		if (found) {
			console.log("-----> Video Found. Not adding.")
			response.write(JSON.stringify({'result' : 'Video Found. Not adding.',}));
			response.end();
			return;
		}
		await this.theDatabase.put(username, videoObj);
		response.write(JSON.stringify(
						{'result' : 'created',
						'username' : username,
						'videoObj': videoObj
						}));
		response.end();
	}

	public async readVideo(username : string, category : string, label: string, response) : Promise<void> {
		console.log("reading video...");
		await this.theDatabase.get(username); //can't be right, what does get() use as the key?

		response.write(JSON.stringify(
			{'result' : 'read',
			'username' : username,
			'category' : category,
			'label' : label,
			'title' : faker.random.word() + " video",
			'notes' : faker.random.words() + " video",
			'bookmarks' : faker.date.recent() + " - " + faker.random.words() + ", " + faker.date.recent() + " - " + faker.random.words(),
		}
		))
		response.end();
	}

	public async readAllVideos(username : string, response) : Promise<void> {
		console.log("\n\nreading all videos...");

		let userObj = await this.theDatabase.getAll(username);
		let labelVideos = this.parseLabelVideos(userObj);


		response.write(JSON.stringify(
			{'result' : 'read all videos',
			'username' : username,
			'videoData' : labelVideos
		}
		))
		response.end();
	}

	public parseLabelVideos(videoObj : any) {
		console.log("parsing user obj");
		let labelVideos = videoObj.categories[0].labels;
		return labelVideos;
	}

	public async updateVideo(username : string, videoId : string, videoObj : object, response) : Promise<void> {
		console.log("updating video...");
		await this.theDatabase.putUpdate(username, videoObj);

		console.log("INSERTED UPDATED VID INTO DB");

		response.write(JSON.stringify(
			{
				'result' : 'updated',
				'username' : username,
				'video ID' : videoId,
				'updatedVideoData' : videoObj
			}
		))
		response.end();
	}
	
	public async deleteVideo(username: string, videoId : string, response) : Promise<void> {
		console.log("deleting video. Username: " + username);
		await this.theDatabase.del(username, videoId);

		console.log('DELETED VID');
		response.write(JSON.stringify(
						{'result' : 'deleted',
						'username' : username,
						'videoId' : videoId,
						}));
		response.end();
    }
​​
}

