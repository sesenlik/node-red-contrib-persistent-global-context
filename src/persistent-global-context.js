module.exports = function(RED) {
    function PersistentGlobalContextNode(config) {
        RED.nodes.createNode(this,config);		
		const fs = require('fs');
		const path = RED.settings.get('userDir') + '\\GlobalContext.json';
		//this.warn("ON_START");
		var globalData = "";
		var globalObj = {};

		try {
			if (fs.existsSync(path)) {
				globalData = fs.readFileSync(path, 'utf8');
				globalObj = Object.assign({}, JSON.parse(globalData));
				
				// Access global context of Node-Red instance
				var global = this.context().global;
				var globalNames = Object.keys(globalObj);
				for (var i = 0; i < globalNames.length; i++){
					global.set(globalNames[i],globalObj[globalNames[i]]);
				}
				//var msg = { payload:"Global context is loaded successfully!" };
				//this.send(msg);
				//this.warn(msg);
			}else{
				this.error("Cannot find json file inside [" + path +"]!");
			}
		} catch(err) {
			this.error(err);
		}
		
        this.on('input', function(msg, send, done) {		
			// Access global context of Node-Red instance
			var global = this.context().global;
			// Create a JSON object for containing all global data
			var obj = {};			
			var globalNames = global.keys();
			for (var i = 0; i < globalNames.length; i++){
				obj[globalNames[i]] = global.get(globalNames[i]);
			}
			var globalText = JSON.stringify(obj);
			fs.writeFile(path, globalText, err => {
				if (err) {
					this.error(err);
				}
				// file written successfully
				});
				
			// Once finished, call 'done'.
			// This call is wrapped in a check that 'done' exists
			// so the node will work in earlier versions of Node-RED (<1.0)
			if (done) {
				done();
			}
		});

		this.on('close', function() {
			//this.warn("ON_CLOSE");
		});

    }
    RED.nodes.registerType("persistent-global-context",PersistentGlobalContextNode);
}