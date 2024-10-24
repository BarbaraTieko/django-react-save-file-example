from rest_framework.decorators import api_view
from .models import Note
from .serializers import NoteSerializer
from rest_framework.response import Response


@api_view(['GET', 'POST'])
def api_notes(request):
    if request.method == 'POST':
        note = Note()
        note.title = request.data['title']
        
        print(request.data)
        if 'audio' in request.data:
            note.audio_blob = request.data['audio'].file.read() # read() returns a bytes object


        note.save()


    notes = Note.objects.all()
    note_serializer = NoteSerializer(notes, many=True)
    return Response(note_serializer.data)

