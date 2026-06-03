from django.db import models


def gallery_upload_path(instance, filename):
	folder_map = {
		'press_release': 'gallery/press_releases',
		'achievement': 'gallery/achievements',
		'photo': 'gallery/photos',
		'video': 'gallery/videos',
	}
	folder = folder_map.get(instance.content_type, 'gallery/uploads')
	return f'{folder}/{filename}'


class Gallery(models.Model):
	class ContentType(models.TextChoices):
		PRESS_RELEASE = 'press_release', 'Press Release'
		ACHIEVEMENT = 'achievement', 'Achievement'
		PHOTO = 'photo', 'Photo'
		VIDEO = 'video', 'Video'

	title = models.CharField(max_length=255)
	content_type = models.CharField(max_length=20, choices=ContentType.choices)
	description = models.TextField(blank=True)
	media_file = models.FileField(upload_to=gallery_upload_path)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	class Meta:
		ordering = ('-created_at',)

	def __str__(self):
		return f'{self.get_content_type_display()}: {self.title}'

