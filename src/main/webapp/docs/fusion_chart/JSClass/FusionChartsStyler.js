/**
 * FusionChartsStyler : XML Dom editor class
 *
 * Created by iCOMPIA Corp. 2007
 * Contact Us : mjkim@icompia.com
 * Version 2,5,0,1
 */
if(typeof icompia == "undefined") { var icompia = {}; }
icompia.FusionChartsStyler = function(xml){
	if (!document.getElementById) { return; }

	//Create container objects
	this.xmlDom = {};
	this.styleElements = {};
	this.applyElements = {};
	this.trendElements = {};

	if(xml) {
		this.setXml("XMLDOM", xml);
	} else {
		throw new Error("Not xml!!");
	}

	this.setElementStyle(this.getXml("XMLDOM"));
};

icompia.FusionChartsStyler.prototype = {
	setXml: function(name, value) {
		this.xmlDom[name] = value;
	},
	getXml: function(name) {
		return this.xmlDom[name];
	},
	getXmlDom: function() {
		return this.xmlDom["XMLDOM"];
	},
	getXmlStr: function() {
		return this.xmlDom["XMLDOM"].xml.replace(/\"/g, "'");
	},
	setStyleElement: function(name, value) {
		this.styleElements[name] = value;
	},
	getStyleElement: function(name) {
		return this.styleElements[name];
	},
	setApplyElement: function(name, value) {
		this.applyElements[name] = value;
	},
	getApplyElement: function(name) {
		return this.applyElements[name];
	},
	setTrendElement: function(name, value) {
		this.trendElements[name] = value;
	},
	getTrendElement: function(name) {
		return this.trendElements[name];
	},
	getSearchNode: function(node, searchNodeName) {
		var xlength = node.childNodes.length;
		for(var i = 0; i < xlength; i++) {
			if(node.childNodes.item(i).nodeName == searchNodeName) {
				return node.childNodes.item(i);
			}
		}
		return null;
	},
	setElementStyle: function(node) {
		var styleNode = this.getSearchNode(node.documentElement, "styles");
		if(styleNode == null) {
			styleNode = node.createElement("styles");
			node.documentElement.insertBefore(styleNode, null);
		}
		this.setXml("styles", styleNode);

		var definitionNode = node.createElement("definition");
		var applicationNode = node.createElement("application");
		styleNode.insertBefore(definitionNode, null);
		styleNode.insertBefore(applicationNode, null);

		this.setXml("definition", definitionNode);
		this.setXml("application", applicationNode);
	},
	addDataSetAttribute : function(id,name,value){
		var chartElement = this.getXmlDom().childNodes[0];/*<chart>*/
		for(var i=0,len=chartElement.childNodes.length; i<len; i++){
			var node = chartElement.childNodes[i];
			if(node.nodeName == 'dataset' && node.getAttribute('id') == id){
				node.setAttribute(name,value);
			}
		}
	},
	addStyleElement: function(name, toObject) {
		var node = this.getXml("XMLDOM");
		var defNode = this.getXml("definition");
		var appNode = this.getXml("application");

		var nodeNameArr = name.split(",");

		for(var i = 0; i < nodeNameArr.length; i++) {
			var styleNode = node.createElement("style");
			defNode.insertBefore(styleNode, null);

			this.setStyleElement(nodeNameArr[i], styleNode);
			styleNode.setAttribute("name", nodeNameArr[i]);
		}

		var applyNode = node.createElement("apply");
		appNode.insertBefore(applyNode, null);

		this.setApplyElement(name, applyNode);

		applyNode.setAttribute("toObject", toObject);
		applyNode.setAttribute("styles", name);

	},
	addStyleAttribute: function(name, attrName, attrValue) {
		var styleNode = this.getStyleElement(name);

		styleNode.setAttribute(attrName, attrValue);
	},
	setElementTrendLines: function(node){
		var trendNode = this.getSearchNode(node.documentElement, "trendLines");
		if(trendNode == null) {
			trendNode = node.createElement("trendLines");
			var lineNode = node.createElement("line");
			trendNode.insertBefore(lineNode, null);

			node.documentElement.insertBefore(trendNode, null);

			this.setTrendElement("line", lineNode);
		}
	},
	addTrendLines: function(attrName, attrValue){
		this.setElementTrendLines(this.getXml("XMLDOM"));
		
		var lineNode = this.getTrendElement("line");

		lineNode.setAttribute(attrName, attrValue);
	},
	setNodeAttribute: function(searchId, attrName, attrValue) {
		var node = this.getXml("XMLDOM");

		var searchNode = this.getSearchNodeLoop(node.documentElement, searchId);

		if(typeof searchNode == "undefined" || searchNode == null) {
			throw new Error("Can't find Attribute ID : " + searchId);
		}

		searchNode.setAttribute(attrName, attrValue);
	},
	getSearchNodeLoop: function(node, searchId) {
		var elementId = node.getAttribute("id");
		var searchNode = null;

		if(elementId == searchId) {
			return node;
		} else {
			var xlength = node.childNodes.length;

			if(xlength == 0)
				return null;

			for(var i = 0; i < xlength; i++) {
				searchNode = this.getSearchNodeLoop(node.childNodes[i], searchId);

				if(searchNode != null)
					return searchNode;
			}
		}
		return null;
	},
	getSearchNodeByTagName: function(node, searchTagName){
		var elementName = node.tagName;
		var searchNode = null;

		if(elementName == searchTagName) {
			return node;
		} else {
			var xlength = node.childNodes.length;
			if(xlength == 0)
				return null;

			for(var i = 0; i < xlength; i++) {
				searchNode = this.getSearchNodeByTagName(node.childNodes[i], searchTagName);

				if(searchNode != null)
					return searchNode;
			}
		}
		return null;
	},
	setPreDefinedColor: function(colorArr) {
		var node = this.getXml("XMLDOM");
		var chartElement = node.childNodes[0];
		var preDefinedColorIndex = 0;
		var itemIndex = 0;

		var colorArrLength = colorArr.length;

		var xlength;
		var currNode;
		// single series
		if(this.getSearchNodeByTagName(chartElement, "categories") == null) {
			xlength = chartElement.childNodes.length;

			if(xlength == 0)
				return;

			for(var i = 0; i < xlength; i++) {
				currNode = chartElement.childNodes[i];

				if(currNode.tagName == "set" && colorArrLength > itemIndex++)
					currNode.setAttribute("color", colorArr[preDefinedColorIndex++]);
			}
		} else { // multi series
			xlength = chartElement.childNodes.length;

			if(xlength == 0)
				return;

			for(var j = 0; j < xlength; j++) {
				currNode = chartElement.childNodes[j];

				if(currNode.tagName == "dataset" && colorArrLength > itemIndex++)
					currNode.setAttribute("color", colorArr[preDefinedColorIndex++]);
			}
		}
	}
};

/* Aliases for easy usage */
var FusionChartsStyler = icompia.FusionChartsStyler;