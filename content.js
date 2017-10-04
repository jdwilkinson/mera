// Words that trigger deletion of a section.
var prohibited = ['Kellerman', 'Stephen A', 'LaVar', 'LaMelo', 'Lonzo'];
// Nodes to be removed, in [parent, child] tuples.
var toBeRemoved = [];

var body = document.getElementsByTagName("body")[0];
flagNodes(body);
removeFlagged();

function flagNodes(node) {
	var children = node.childNodes;
	for (var i=0; i < children.length; i++) {
		var child = children[i];
		if (shouldBeRemoved(child)) {
			var section = findParent(child, "section");
			// If it's not in a <section>, ignore it.
			if (!section) {
				continue;
			}
			var sectionParent = section.parentNode;
			toBeRemoved.push([sectionParent, section]);
		} else {
			flagNodes(child);
		}
	}
}

function findParent(node, tagName) {
	if (!node) {
		return null;
	}
	if (node.tagName && node.tagName.toLowerCase() == tagName) {
		return node;
	}
	return findParent(node.parentNode, tagName);
}

function shouldBeRemoved(node) {
	var nodeValue = node.nodeValue;
	if (nodeValue) {
		for (var i = 0; i < prohibited.length; i++) {
			if (nodeValue.includes(prohibited[i])) {
				return true;
			}
		}
	}
	return false;
}

function removeFlagged() {
	for (var i = 0; i < toBeRemoved.length; i++) {
		var parent = toBeRemoved[i][0];
		var child = toBeRemoved[i][1];
		// Sometimes non-children get added, so ensure they're valid first.
		if (isChild(parent, child)) {
			parent.removeChild(child);
			var span = document.createElement("section");
			var text = document.createTextNode("ESPN is so reasonable!");
			span.appendChild(text);
			parent.appendChild(span);
		}
	}
}

function isChild(parent, child) {
	var children = parent.childNodes;
	for (var i = 0; i < children.length; i++) {
		if (children[i] == child) {
			return true;
		}
	}
	return false;
}
