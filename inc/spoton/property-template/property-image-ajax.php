<?php
	$query = 'RKEY eq ' . $pkey . ' and ' . " LN eq '" . $ln . "'";
    $ImageQuery = $proxy->RetsListingImages()->filter($query)->Select('ImageURL');
    $ImageResponse = $ImageQuery->Execute();

?>
<div class="spotonGalleryWrapper">
	<div id="spotonGallery_<?php echo $ln; ?>">
<?php
	foreach($ImageResponse->Result as $listingimage)
	{
?>
	<a rel="external" href="<?php echo $listingimage->ImageURL; ?>" title="">
		<img src="<?php echo $listingimage->ImageURL; ?>" alt="" width="700" height="450" />
	</a>
<?php
	}
?>
	</div>
	<input type="hidden" value="1" class="spotonGalleryLoaded" />
</div>