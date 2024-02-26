package com.plcoding.ktorclientandroid.data.remote

import com.latech.procrastinatorsclient.data.remote.HttpRoutes
import com.latech.procrastinatorsclient.data.remote.PostsService
import com.latech.procrastinatorsclient.data.remote.dto.PostRequest
import com.latech.procrastinatorsclient.data.remote.dto.PostResponse
import com.latech.procrastinatorsclient.data.remote.dto.PostResponseList
import io.ktor.client.*
import io.ktor.client.call.body
import io.ktor.client.plugins.ClientRequestException
import io.ktor.client.plugins.RedirectResponseException
import io.ktor.client.plugins.ServerResponseException
import io.ktor.client.request.*
import io.ktor.client.statement.HttpResponse
import io.ktor.http.*

class PostsServiceImpl(
    private val client: HttpClient
) : PostsService {

    override suspend fun getPosts(): PostResponseList? {
        return try {
            client.get(HttpRoutes.POSTS).body<PostResponseList>()
        } catch(e: RedirectResponseException) {
            // 3xx - responses
            println("Error: ${e.response.status.description}")
            null
        } catch(e: ClientRequestException) {
            // 4xx - responses
            println("Error: ${e.response.status.description}")
            null
        } catch(e: ServerResponseException) {
            // 5xx - responses
            println("Error: ${e.response.status.description}")
            null
        } catch(e: Exception) {
            println("Error: ${e.message}")
            null
        }
    }

    override suspend fun createPost(postRequest: PostRequest): PostResponse? {
        return try {
            val response: HttpResponse = client.post() {
                url(HttpRoutes.POSTS)
                contentType(ContentType.Application.Json)
                setBody(postRequest)
            }
            response.body<PostResponse>()
        } catch(e: RedirectResponseException) {
            // 3xx - responses
            println("Error: ${e.response.status.description}")
            null
        } catch(e: ClientRequestException) {
            // 4xx - responses
            println("Error: ${e.response.status.description}")
            null
        } catch(e: ServerResponseException) {
            // 5xx - responses
            println("Error: ${e.response.status.description}")
            null
        } catch(e: Exception) {
            println("Error: ${e.message}")
            null
        }
    }
}