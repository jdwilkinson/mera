var body = document.getElementsByTagName("body")[0];

handleChildren(body);

function handleChildren(node) {
	var children = node.childNodes;
	for (var i=0; i < children.length; i++) {
		var child = children[i];
		if (child.nodeValue && child.nodeValue.includes('Kellerman')) {
			var section = findParent(child, "section");
			var sectionParent = section.parentNode;
			sectionParent.removeChild(section);
			var span = document.createElement("section");
			var text = document.createTextNode("ESPN is so reasonable!");
			span.appendChild(text);
			sectionParent.appendChild(span);
		} else {
			handleChildren(child);
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
