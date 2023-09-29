{{/* vim: set filetype=mustache: */}}
{{/*
Expand the name of the chart.
*/}}
{{- define "name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
*/}}
{{- define "fullname" -}}
{{- $name := default .Chart.Name .Values.nameOverride -}}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" -}}
{{- end -}}

# Separator
{{- define "environment" -}}
{{- $release := . | replace "jx-" ""  -}}
{{- printf "%s" $release -}}
{{- end -}}

# Separator
{{- define "tlsName" -}}
{{- $release := . | replace "jx-" ""  -}}
{{- if eq $release "production" -}}
{{- printf "tls-%s-com-p" "jimatshop" -}}
{{- else if eq $release "preprod" -}}
{{- printf "tls-%s-jimathub-com-p" "prod" -}}
{{- else -}}
{{- printf "tls-%s-jimathub-com-p" "stag" -}}
{{- end -}}
{{- end -}}

