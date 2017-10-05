// Words that trigger deletion of a section.
var prohibited = ['Kellerman', 'Stephen A', 'LaVar', 'LaMelo', 'Lonzo'];
// Sections to be cleared.
var toBeRemoved = [];

var body = document.getElementsByTagName("body")[0];
flagNodes(body);
removeFlagged();

function flagNodes(node) {
	var children = node.childNodes;
	for (var i=0; i < children.length; i++) {
		var child = children[i];
		if (shouldBeRemoved(child)) {
			var section = findParent(child, "article");
			// If it's not in a <section>, ignore it.
			if (!section) {
				continue;
			}
			if (!toBeRemoved.includes(section)) {
				toBeRemoved.push(section);
			}
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
		var section = toBeRemoved[i];
		while (section.childNodes.length > 0) {
			section.removeChild(section.childNodes[0]);
		}
		var span = document.createElement("span");
		var text = document.createTextNode("ESPN is so reasonable!");
		span.appendChild(text);
		section.appendChild(span);
	}
}
