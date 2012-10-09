/* Spot-on IDX Javascript */

/* Dynamic photo cropping/resizing */
function ScaleImage(srcwidth, srcheight, targetwidth, targetheight, fLetterBox) {

    var result = { width: 0, height: 0, fScaleToTargetWidth: true };

    if ((srcwidth <= 0) || (srcheight <= 0) || (targetwidth <= 0) || (targetheight <= 0)) {
        return result;
    }

    // scale to the target width
    var scaleX1 = targetwidth;
    var scaleY1 = (srcheight * targetwidth) / srcwidth;

    // scale to the target height
    var scaleX2 = (srcwidth * targetheight) / srcheight;
    var scaleY2 = targetheight;

    // now figure out which one we should use
    var fScaleOnWidth = (scaleX2 > targetwidth);
    if (fScaleOnWidth) {
        fScaleOnWidth = fLetterBox;
    }
    else {
        fScaleOnWidth = !fLetterBox;
    }

    if (fScaleOnWidth) {
        result.width = Math.floor(scaleX1);
        result.height = Math.floor(scaleY1);
        result.fScaleToTargetWidth = true;
    }
    else {
        result.width = Math.floor(scaleX2);
        result.height = Math.floor(scaleY2);
        result.fScaleToTargetWidth = false;
    }
    result.targetleft = Math.floor((targetwidth - result.width) / 2);
    result.targettop = Math.floor((targetheight - result.height) / 2);

    return result;
}

function RememberOriginalSize(img) {
	if (!img.originalsize) {
		img.originalsize = {width : img.width, height : img.height};
	}
}

function FixImage(fLetterBox, div, img) {
	RememberOriginalSize(img);
	var targetwidth = jQuery(div).width();
	var targetheight = jQuery(div).height();
	var srcwidth = img.originalsize.width;
	var srcheight = img.originalsize.height;
	var result = ScaleImage(srcwidth, srcheight, targetwidth, targetheight, fLetterBox);

	img.width = result.width;
	img.height = result.height;
	jQuery(img).css("left", result.targetleft);
	jQuery(img).css("top", result.targettop);
}


function FixImages(fLetterBox, container) {
	jQuery(container).find('div.aspectcorrect').each(function (index, div) {
		var img = jQuery(div).find("img").get(0);
		FixImage(fLetterBox, div, img);
	});
}