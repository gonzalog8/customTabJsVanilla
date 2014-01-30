//USAGE: Recieves an element to convert to tabSet.
//The element must contain an UL with the tabs title. Each LI must define attribute tabId
//Each tab must have a div with attribut tabId to associate body with title

function convertToTabs(element){
	console.log("convertToTabs invoked");
	var children			//all children of the element we want to convert to tab set
	   ,length				//used in al loops for performance improvements
	   ,tabTitleList		//List of tab titles. It's a UL element.
	   ,tabBodies = []		//Array of divs that have an custom attribute tabId
	   ,selectedTabId;		//Id of the selected tab

	children = element.children;
	length = children.length;
	tabTitleList;

	//////////////////////////////////
	//Obtaining the tab titles element
	//////////////////////////////////
	for(var i=0; i<length; i++){
		if(children[i].tagName === 'UL'){
			tabTitleList = children[i];
			break;
		}
	}

	if(tabTitleList === undefined){
		alert("convertToTabs-ERROR: Required UL (tabsTitleList) element not found");
		return;
	}

	tabTitleList.classList.add("tabsTitleContainer");

	///////////////////////////////
	//Obtaining array of tab bodies
	///////////////////////////////
	for(var i=0; i<length; i++){
		if(children[i].tagName === 'DIV' && children[i].getAttribute('tabId')){
			tabBodies.push(children[i]);
		}
	}

	if(tabBodies.length === 0){
		alert("convertToTabs-ERROR: No DIV with attribute tabId found");
		return;
	}

	///////////////////////////////////
	//Applying style to the tabs titles
	///////////////////////////////////
	length = tabTitleList.children.length;
	for(var i=0; i<length; i++){
		tabTitleList.children[i].classList.add("tabsTitle");
	}

	////////////////////////////////
	//Selecting first tab by default
	////////////////////////////////
	tabTitleList.children[0].classList.add("tabsTitleSelected");
	selectedTabId = tabTitleList.children[0].children[0].getAttribute("href");

	length = tabBodies.length;
	for(var i=0; i<length; i++){
		if(tabBodies[i].getAttribute("tabid") === selectedTabId){
			tabBodies[i].classList.add("tabsBodySelected");
		}else{
			tabBodies[i].classList.add("tabsBodyUnSelected");
		}
	}

	//////////////////////////////////////////////////////////////////
	//Adding event handler for the tabTitles. (using event delegation)
	//////////////////////////////////////////////////////////////////
	tabTitleList.onclick = function(event){
		var targetElement = event.target   	//used for event delegation. Is the element clicked, child of tabTitleList
		    ,previousSelectedTabBody		//div with class tabsBodySelected
		    ,previousSelectedTabTitle		//li with class tabsTitleSelected
		    ,tabsTitleList					//List of tab titles. It's a UL element. Parent of the targetElement
		    ,container 						//tabSet container
		    ,length; 						//used in al loops for performance improvements

		
		if( targetElement.tagName === "LI"){
			console.log("Target element selected is an LI");
			targetElement = targetElement.children[0];
		}else if( targetElement.tagName === "A" ){
			console.log("Target element selected is an A");
			event.preventDefault();
		}else{
			console.log("Target element selected is not a valid tab title");
			return;
		}

		console.log("Selected tabid: " + targetElement.getAttribute("href"));

		//Unselecting previous tab
		//tab body
		tabsTitleList = targetElement.parentElement.parentElement;
		container = tabsTitleList.parentElement;
		length = container.children.length;
		for(var i=0; i<length; i++){
			if(container.children[i].className.indexOf("tabsBodySelected") >= 0){
				previousSelectedTabBody = container.children[i];
				break;
			}
		}
		if(previousSelectedTabBody !== undefined){
			previousSelectedTabBody.classList.remove("tabsBodySelected");
			previousSelectedTabBody.classList.add("tabsBodyUnSelected");			
		}

		//tab title
		length = tabsTitleList.children.length;
		for(var i=0; i<length; i++){
			if(tabsTitleList.children[i].className.indexOf("tabsTitleSelected") >= 0){
				tabsTitleList.children[i].classList.remove("tabsTitleSelected");
				break;
			}
		}

		//Selecting new tab
		//tab body
		length = container.children.length;
		for(var i=0; i<length; i++){
			if(container.children[i].tagName === 'DIV' 
			&& container.children[i].getAttribute('tabId') === targetElement.getAttribute("href")){

				container.children[i].classList.add("tabsBodySelected");
				container.children[i].classList.remove("tabsBodyUnSelected");
				break;
			}
		}
		//tab title
		targetElement.parentElement.classList.add("tabsTitleSelected");

	}
}