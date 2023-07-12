module.exports = function(RED) {
    function PersistentGlobalContextNode(config) {
        RED.nodes.createNode(this,config);		
		const fs = require('fs');
		const path = RED.settings.get('userDir') + '/GlobalContext.json';
		//this.warn("ON_START");
		var globalData = "";
		var globalObj = {};
		var msg1 = {};
		var firstCycle = false;
		try {
			if (fs.existsSync(path)) {
				globalData = fs.readFileSync(path, 'utf8');
				globalObj = Object.assign({}, JSON.parse(globalData));
				
				if (Object.keys(globalObj).length === 0 && globalObj.constructor === Object){
					this.error("Empty Global Context file!");
					msg1 = { payload:"Empty Global Context file!",
							error:"Empty Global Context file!"};
				}else{
					// Access global context of Node-Red instance
					var global = this.context().global;
					var globalNames = Object.keys(globalObj);
					for (var i = 0; i < globalNames.length; i++){
						global.set(globalNames[i],globalObj[globalNames[i]]);
					}

					msg1 = { payload:"Global context is loaded successfully!" };
					
					// this does not work because flows have not started yet.
					this.send(msg1);
					}
				
				
			}else{
				this.error("Cannot find json file inside [" + path +"]!");
				msg1 = { payload:"Cannot find json file inside [" + path +"]!",
							error:"Cannot find json file inside [" + path +"]!" };
				this.send(msg1);
			}
		} catch(err) {
			this.error(err);
				msg1 = { payload:err,
						error:err };
				this.send(msg1);
		}
		

        this.on('input', function(msg, send, done) {
			if (!firstCycle){
				//only works once when the node receives the first inject to send status messages created during node creation(above code) to output 
				firstCycle = true;
				this.send(msg1);
			}		
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