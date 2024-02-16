from flask import jsonify, Blueprint, request

from models.movie import Movie

movies = Blueprint('movies', __name__)


@movies.route('/')
def get_movies():
    movies = Movie.objects()
    return jsonify(movies), 200


@movies.route('/movies', methods=["POST"])
def add_movie():
    body = request.get_json()
    movie = Movie(**body).save()
    return jsonify(movie), 201
