from django.http import HttpResponse

def simple_string(request):
	return HttpResponse("Hello from the API.")
